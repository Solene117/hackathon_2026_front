import { addGpsPoint } from "../api/activities";
import {
  haversineDistanceMeters,
  metersPerSecondToKmh,
} from "../lib/activity-metrics";
import {
  clearActiveRecordingId,
  clearRecordingState,
  saveRecordingState,
  type RecordingMetrics,
  type RecordingPhase,
  type StoredRecordingState,
} from "../lib/activity-recording-storage";

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

/** État mutable du moteur — vit hors React, survit à la navigation. */
let watchId: number | null = null;
let timerId: number | null = null;
let currentActivityId: number | null = null;

let recordingStartedAt: number | null = null;
let pausedDurationMs = 0;
let pauseStartedAt: number | null = null;
let lastPosition: GeolocationPosition | null = null;
let lastAltitude: number | null = null;
let totalDistanceM = 0;
let elevationGainM = 0;
let lastGpsSendAt = 0;
let phase: RecordingPhase = "preparing";
let metrics: RecordingMetrics = DEFAULT_METRICS;
let elapsedSeconds = 0;

type RecordingStoreSync = {
  setState: (partial: Record<string, unknown>) => void;
};

let storeSync: RecordingStoreSync | null = null;

export function bindRecordingStore(sync: RecordingStoreSync): void {
  storeSync = sync;
}

function syncStore(partial: Record<string, unknown>): void {
  storeSync?.setState(partial);
}

function getElapsedSeconds(): number {
  if (!recordingStartedAt) return 0;

  const now = Date.now();
  let pausedMs = pausedDurationMs;

  if (pauseStartedAt) {
    pausedMs += now - pauseStartedAt;
  }

  return Math.max(0, Math.floor((now - recordingStartedAt - pausedMs) / 1000));
}

function persistState(): void {
  if (currentActivityId == null) return;

  saveRecordingState({
    activityId: currentActivityId,
    phase,
    recordingStartedAt,
    pausedDurationMs,
    pauseStartedAt,
    elapsedSeconds,
    metrics,
    totalDistanceM,
    elevationGainM,
    lastAltitude,
  });
}

async function sendGpsPoint(position: GeolocationPosition): Promise<void> {
  if (currentActivityId == null) return;

  const { latitude, longitude, accuracy, altitude, speed } = position.coords;

  try {
    await addGpsPoint(currentActivityId, {
      latitude,
      longitude,
      accuracy: accuracy ?? undefined,
      altitude: altitude ?? undefined,
      speed: speed ?? undefined,
      recordedAt: new Date(position.timestamp).toISOString(),
    });
  } catch {
    // Ne pas bloquer l'UI si l'envoi GPS échoue.
  }
}

function handlePosition(position: GeolocationPosition): void {
  const { latitude, longitude, altitude, speed } = position.coords;
  const previous = lastPosition;

  if (previous) {
    totalDistanceM += haversineDistanceMeters(
      previous.coords.latitude,
      previous.coords.longitude,
      latitude,
      longitude,
    );
  }

  if (altitude != null) {
    if (lastAltitude != null && altitude > lastAltitude) {
      elevationGainM += altitude - lastAltitude;
    }
    lastAltitude = altitude;
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
              Math.max((position.timestamp - previous.timestamp) / 1000, 0.1),
          )
        : 0;

  lastPosition = position;

  metrics = {
    speedKmh,
    distanceKm: totalDistanceM / 1000,
    elevationGainM,
    currentElevationM: altitude ?? metrics.currentElevationM,
  };

  elapsedSeconds = getElapsedSeconds();
  syncStore({ metrics, elapsedSeconds });
  persistState();

  const now = Date.now();
  if (now - lastGpsSendAt >= GPS_SEND_INTERVAL_MS) {
    lastGpsSendAt = now;
    void sendGpsPoint(position);
  }
}

function stopTimer(): void {
  if (timerId != null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function startTimer(): void {
  stopTimer();
  elapsedSeconds = getElapsedSeconds();
  syncStore({ elapsedSeconds });

  timerId = window.setInterval(() => {
    elapsedSeconds = getElapsedSeconds();
    syncStore({ elapsedSeconds });
    persistState();
  }, 1000);
}

function stopGpsWatch(): void {
  if (watchId != null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

function startGpsWatch(): void {
  if (!navigator.geolocation) {
    syncStore({ error: "La géolocalisation n'est pas disponible sur cet appareil." });
    return;
  }

  stopGpsWatch();
  watchId = navigator.geolocation.watchPosition(
    handlePosition,
    () => {
      syncStore({ error: "Impossible d'accéder à votre position GPS." });
    },
    GPS_OPTIONS,
  );
}

function ensureEngineRunning(): void {
  if (phase !== "recording") return;
  if (timerId == null) startTimer();
  if (watchId == null) startGpsWatch();
}

function applyStoredState(stored: StoredRecordingState): void {
  currentActivityId = stored.activityId;
  phase = stored.phase;
  recordingStartedAt = stored.recordingStartedAt;
  pausedDurationMs = stored.pausedDurationMs;
  pauseStartedAt = stored.pauseStartedAt;
  totalDistanceM = stored.totalDistanceM;
  elevationGainM = stored.elevationGainM;
  lastAltitude = stored.lastAltitude;
  metrics = stored.metrics;
  elapsedSeconds = stored.elapsedSeconds;

  syncStore({
    activityId: stored.activityId,
    phase: stored.phase,
    metrics: stored.metrics,
    elapsedSeconds: stored.elapsedSeconds,
  });
}

function resetEngineRefs(): void {
  stopTimer();
  stopGpsWatch();
  currentActivityId = null;
  recordingStartedAt = null;
  pausedDurationMs = 0;
  pauseStartedAt = null;
  lastPosition = null;
  lastAltitude = null;
  totalDistanceM = 0;
  elevationGainM = 0;
  lastGpsSendAt = 0;
  phase = "preparing";
  metrics = DEFAULT_METRICS;
  elapsedSeconds = 0;
}

export const recordingEngine = {
  getActivityId(): number | null {
    return currentActivityId;
  },

  getPhase(): RecordingPhase {
    return phase;
  },

  applyStoredState,

  ensureEngineRunning,

  start(): void {
    syncStore({ error: null });
    recordingStartedAt = Date.now();
    pausedDurationMs = 0;
    pauseStartedAt = null;
    phase = "recording";
    syncStore({ phase: "recording" });
    startTimer();
    startGpsWatch();
    persistState();
  },

  pause(): void {
    pauseStartedAt = Date.now();
    stopTimer();
    stopGpsWatch();
    phase = "paused";
    elapsedSeconds = getElapsedSeconds();
    syncStore({ phase: "paused", elapsedSeconds });
    persistState();
  },

  resume(): void {
    if (pauseStartedAt) {
      pausedDurationMs += Date.now() - pauseStartedAt;
      pauseStartedAt = null;
    }

    phase = "recording";
    syncStore({ phase: "recording" });
    startTimer();
    startGpsWatch();
    persistState();
  },

  cleanup(activityId: number): void {
    resetEngineRefs();
    clearRecordingState(activityId);
    clearActiveRecordingId();
  },

  reset(): void {
    resetEngineRefs();
  },
};
