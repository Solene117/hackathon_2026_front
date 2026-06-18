import { useCallback, useEffect, useRef, useState } from "react";
import {
  addGpsPoint,
  deleteActivity,
  fetchActivity,
  finishActivity,
} from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import { invalidateAfterActivityChange } from "../stores";
import {
  haversineDistanceMeters,
  metersPerSecondToKmh,
} from "../lib/activity-metrics";
import type { ActivityDetail, TerrainType } from "../types/activity";
import {
  clearRecordingState,
  loadRecordingState,
  saveRecordingState,
  type RecordingMetrics,
  type RecordingPhase,
  type StoredRecordingState,
} from "../lib/activity-recording-storage";

export type { RecordingMetrics, RecordingPhase };

const GPS_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 2_000,
  timeout: 15_000,
};

const GPS_SEND_INTERVAL_MS = 5_000;

const DEFAULT_METRICS: RecordingMetrics = {
  speedKmh: 0,
  distanceKm: 0,
  elevationGainM: 0,
  currentElevationM: 0,
};

type UseActivityRecordingOptions = {
  activityId: number;
  onExit: () => void;
  initialActivity?: ActivityDetail;
};

function isRecordingActivity(activity: ActivityDetail): boolean {
  return activity.source === "APP_TRACKED" && activity.status === "IN_PROGRESS";
}

function createInitialState(activityId: number): StoredRecordingState {
  return {
    activityId,
    phase: "preparing",
    recordingStartedAt: null,
    pausedDurationMs: 0,
    pauseStartedAt: null,
    elapsedSeconds: 0,
    metrics: DEFAULT_METRICS,
    totalDistanceM: 0,
    elevationGainM: 0,
    lastAltitude: null,
  };
}

export function useActivityRecording({
  activityId,
  onExit,
  initialActivity,
}: UseActivityRecordingOptions) {
  const hasInitialActivity =
    initialActivity?.id === activityId && isRecordingActivity(initialActivity);

  const [isLoading, setIsLoading] = useState(!hasInitialActivity);
  const [phase, setPhase] = useState<RecordingPhase>("preparing");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [metrics, setMetrics] = useState<RecordingMetrics>(DEFAULT_METRICS);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activityName, setActivityName] = useState("Sortie vélo");
  const [activityTerrainType, setActivityTerrainType] =
    useState<TerrainType>("UNKNOWN");

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const recordingStartedAtRef = useRef<number | null>(null);
  const pausedDurationMsRef = useRef(0);
  const pauseStartedAtRef = useRef<number | null>(null);
  const lastPositionRef = useRef<GeolocationPosition | null>(null);
  const lastAltitudeRef = useRef<number | null>(null);
  const totalDistanceMRef = useRef(0);
  const elevationGainMRef = useRef(0);
  const lastGpsSendAtRef = useRef(0);
  const phaseRef = useRef<RecordingPhase>("preparing");
  const metricsRef = useRef<RecordingMetrics>(DEFAULT_METRICS);
  const elapsedSecondsRef = useRef(0);
  const onExitRef = useRef(onExit);

  onExitRef.current = onExit;

  const applyStoredState = useCallback((stored: StoredRecordingState) => {
    phaseRef.current = stored.phase;
    setPhase(stored.phase);
    recordingStartedAtRef.current = stored.recordingStartedAt;
    pausedDurationMsRef.current = stored.pausedDurationMs;
    pauseStartedAtRef.current = stored.pauseStartedAt;
    totalDistanceMRef.current = stored.totalDistanceM;
    elevationGainMRef.current = stored.elevationGainM;
    lastAltitudeRef.current = stored.lastAltitude;
    metricsRef.current = stored.metrics;
    setMetrics(stored.metrics);
    elapsedSecondsRef.current = stored.elapsedSeconds;
    setElapsedSeconds(stored.elapsedSeconds);
  }, []);

  const persistState = useCallback(() => {
    saveRecordingState({
      activityId,
      phase: phaseRef.current,
      recordingStartedAt: recordingStartedAtRef.current,
      pausedDurationMs: pausedDurationMsRef.current,
      pauseStartedAt: pauseStartedAtRef.current,
      elapsedSeconds: elapsedSecondsRef.current,
      metrics: metricsRef.current,
      totalDistanceM: totalDistanceMRef.current,
      elevationGainM: elevationGainMRef.current,
      lastAltitude: lastAltitudeRef.current,
    });
  }, [activityId]);

  const getElapsedSeconds = useCallback(() => {
    if (!recordingStartedAtRef.current) return 0;

    const now = Date.now();
    let pausedMs = pausedDurationMsRef.current;

    if (pauseStartedAtRef.current) {
      pausedMs += now - pauseStartedAtRef.current;
    }

    return Math.max(
      0,
      Math.floor((now - recordingStartedAtRef.current - pausedMs) / 1000),
    );
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    const nextElapsed = getElapsedSeconds();
    elapsedSecondsRef.current = nextElapsed;
    setElapsedSeconds(nextElapsed);
    timerRef.current = window.setInterval(() => {
      const value = getElapsedSeconds();
      elapsedSecondsRef.current = value;
      setElapsedSeconds(value);
      persistState();
    }, 1000);
  }, [getElapsedSeconds, persistState, stopTimer]);

  const stopGpsWatch = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const sendGpsPoint = useCallback(
    async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy, altitude, speed } =
        position.coords;

      try {
        await addGpsPoint(activityId, {
          latitude,
          longitude,
          accuracy: accuracy ?? undefined,
          altitude: altitude ?? undefined,
          speed: speed ?? undefined,
          recordedAt: new Date(position.timestamp).toISOString(),
        });
      } catch {
        // GPS sync failures should not block the recording UI.
      }
    },
    [activityId],
  );

  const handlePosition = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude, altitude, speed } = position.coords;
      const previous = lastPositionRef.current;

      if (previous) {
        totalDistanceMRef.current += haversineDistanceMeters(
          previous.coords.latitude,
          previous.coords.longitude,
          latitude,
          longitude,
        );
      }

      if (altitude != null) {
        if (
          lastAltitudeRef.current != null &&
          altitude > lastAltitudeRef.current
        ) {
          elevationGainMRef.current += altitude - lastAltitudeRef.current;
        }
        lastAltitudeRef.current = altitude;
      }

      const speedKmh =
        speed != null && speed >= 0
          ? metersPerSecondToKmh(speed)
          : previous
            ? metersPerSecondToKmh(
                haversineDistanceMeters(
                  previous.coords.latitude,
                  previous.coords.longitude,
                  latitude,
                  longitude,
                ) /
                  Math.max(
                    (position.timestamp - previous.timestamp) / 1000,
                    0.1,
                  ),
              )
            : 0;

      lastPositionRef.current = position;

      const nextMetrics: RecordingMetrics = {
        speedKmh,
        distanceKm: totalDistanceMRef.current / 1000,
        elevationGainM: elevationGainMRef.current,
        currentElevationM: altitude ?? metricsRef.current.currentElevationM,
      };

      metricsRef.current = nextMetrics;
      setMetrics(nextMetrics);
      persistState();

      const now = Date.now();
      if (now - lastGpsSendAtRef.current >= GPS_SEND_INTERVAL_MS) {
        lastGpsSendAtRef.current = now;
        void sendGpsPoint(position);
      }
    },
    [persistState, sendGpsPoint],
  );

  const startGpsWatch = useCallback(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas disponible sur cet appareil.");
      return;
    }

    stopGpsWatch();
    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      () => {
        setError("Impossible d'accéder à votre position GPS.");
      },
      GPS_OPTIONS,
    );
  }, [handlePosition, stopGpsWatch]);

  const start = useCallback(() => {
    setError(null);
    recordingStartedAtRef.current = Date.now();
    pausedDurationMsRef.current = 0;
    pauseStartedAtRef.current = null;
    phaseRef.current = "recording";
    setPhase("recording");
    startTimer();
    startGpsWatch();
    persistState();
  }, [persistState, startGpsWatch, startTimer]);

  const pause = useCallback(() => {
    pauseStartedAtRef.current = Date.now();
    stopTimer();
    stopGpsWatch();
    phaseRef.current = "paused";
    setPhase("paused");
    elapsedSecondsRef.current = getElapsedSeconds();
    setElapsedSeconds(elapsedSecondsRef.current);
    persistState();
  }, [getElapsedSeconds, persistState, stopGpsWatch, stopTimer]);

  const resume = useCallback(() => {
    if (pauseStartedAtRef.current) {
      pausedDurationMsRef.current += Date.now() - pauseStartedAtRef.current;
      pauseStartedAtRef.current = null;
    }

    phaseRef.current = "recording";
    setPhase("recording");
    startTimer();
    startGpsWatch();
    persistState();
  }, [persistState, startGpsWatch, startTimer]);

  const finish = useCallback(
    async (payload: { name: string; terrainType: TerrainType }) => {
      setError(null);
      setIsSubmitting(true);
      stopTimer();
      stopGpsWatch();

      try {
        await finishActivity(activityId, payload);
        clearRecordingState(activityId);
        await invalidateAfterActivityChange();
        onExitRef.current();
      } catch (err) {
        setError(getApiErrorMessage(err));
        setIsSubmitting(false);
      }
    },
    [activityId, stopGpsWatch, stopTimer],
  );

  const remove = useCallback(async () => {
    setError(null);
    setIsSubmitting(true);
    stopTimer();
    stopGpsWatch();

    try {
      await deleteActivity(activityId);
      clearRecordingState(activityId);
      await invalidateAfterActivityChange();
      onExitRef.current();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setIsSubmitting(false);
    }
  }, [activityId, stopGpsWatch, stopTimer]);

  useEffect(() => {
    let cancelled = false;

    function bootstrapFromActivity(activity: ActivityDetail) {
      if (!isRecordingActivity(activity)) {
        onExitRef.current();
        return;
      }

      setActivityName(activity.name?.trim() || "Sortie vélo");
      setActivityTerrainType(activity.terrainType);

      const stored = loadRecordingState(activityId);
      applyStoredState(stored ?? createInitialState(activityId));
    }

    async function init() {
      if (!hasInitialActivity) {
        setIsLoading(true);
      }
      setError(null);

      try {
        const activity =
          initialActivity?.id === activityId
            ? initialActivity
            : await fetchActivity(activityId);

        if (cancelled) return;

        bootstrapFromActivity(activity);
      } catch (err) {
        if (!cancelled) {
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [activityId, applyStoredState, hasInitialActivity, initialActivity]);

  useEffect(() => {
    if (isLoading) return;

    if (phaseRef.current === "recording") {
      startTimer();
      startGpsWatch();
    }

    return () => {
      stopTimer();
      stopGpsWatch();
    };
    // Only resume tracking when initial load completes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    isLoading,
    phase,
    elapsedSeconds,
    metrics,
    error,
    isSubmitting,
    activityName,
    activityTerrainType,
    start,
    pause,
    resume,
    finish,
    remove,
  };
}
