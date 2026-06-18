import { create } from "zustand";
import {
  deleteActivity,
  fetchActivity,
  finishActivity,
} from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import {
  getActiveRecordingId,
  loadRecordingState,
  setActiveRecordingId,
  type RecordingMetrics,
  type RecordingPhase,
} from "../lib/activity-recording-storage";
import type { ActivityDetail, TerrainType } from "../types/activity";
import { useActivitiesStore } from "./activitiesStore";
import { useAlertsStore } from "./alertsStore";
import { useUserTiresStore } from "./userTiresStore";
import { bindRecordingStore, recordingEngine } from "./recordingEngine";

async function invalidateCachesAfterActivityChange() {
  await Promise.all([
    useActivitiesStore.getState().fetchActivities({ force: true }),
    useAlertsStore.getState().fetchAlerts(),
    useUserTiresStore.getState().fetchTires({ force: true }),
  ]);
}

const DEFAULT_METRICS: RecordingMetrics = {
  speedKmh: 0,
  distanceKm: 0,
  elevationGainM: 0,
  currentElevationM: 0,
};

function createInitialState(activityId: number) {
  return {
    activityId,
    phase: "preparing" as RecordingPhase,
    recordingStartedAt: null,
    pausedDurationMs: 0,
    pauseStartedAt: null,
    elapsedSeconds: 0,
    metrics: DEFAULT_METRICS,
    totalDistanceM: 0,
    elevationGainM: 0,
    lastAltitude: null as number | null,
  };
}

function isRecordingActivity(activity: ActivityDetail): boolean {
  return activity.source === "APP_TRACKED" && activity.status === "IN_PROGRESS";
}

type RecordingStoreState = {
  activityId: number | null;
  phase: RecordingPhase;
  elapsedSeconds: number;
  metrics: RecordingMetrics;
  error: string | null;
  isLoading: boolean;
  isSubmitting: boolean;
  activityName: string;
  activityTerrainType: TerrainType;

  attach: (
    activityId: number,
    initialActivity?: ActivityDetail,
  ) => Promise<void>;
  start: () => void;
  pause: () => void;
  resume: () => void;
  finish: (payload: { name: string; terrainType: TerrainType }) => Promise<boolean>;
  remove: () => Promise<boolean>;
  bootstrap: () => Promise<void>;
  reset: () => void;
};

export const useRecordingStore = create<RecordingStoreState>((set, get) => ({
  activityId: null,
  phase: "preparing",
  elapsedSeconds: 0,
  metrics: DEFAULT_METRICS,
  error: null,
  isLoading: false,
  isSubmitting: false,
  activityName: "Sortie vélo",
  activityTerrainType: "UNKNOWN",

  attach: async (activityId, initialActivity) => {
    if (
      get().activityId === activityId &&
      !get().isLoading &&
      recordingEngine.getActivityId() === activityId
    ) {
      recordingEngine.ensureEngineRunning();
      return;
    }

    set({ isLoading: true, error: null, activityId });

    try {
      const activity =
        initialActivity?.id === activityId
          ? initialActivity
          : await fetchActivity(activityId);

      if (!isRecordingActivity(activity)) {
        set({
          activityId: null,
          phase: "preparing",
          isLoading: false,
        });
        return;
      }

      setActiveRecordingId(activityId);

      const stored =
        loadRecordingState(activityId) ?? createInitialState(activityId);

      recordingEngine.applyStoredState(stored);
      recordingEngine.ensureEngineRunning();

      set({
        activityId,
        phase: stored.phase,
        elapsedSeconds: stored.elapsedSeconds,
        metrics: stored.metrics,
        activityName: activity.name?.trim() || "Sortie vélo",
        activityTerrainType: activity.terrainType,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: getApiErrorMessage(err),
        isLoading: false,
      });
    }
  },

  start: () => {
    recordingEngine.start();
  },

  pause: () => {
    recordingEngine.pause();
  },

  resume: () => {
    recordingEngine.resume();
  },

  finish: async (payload) => {
    const { activityId } = get();
    if (activityId == null) return false;

    set({ isSubmitting: true, error: null });

    try {
      await finishActivity(activityId, payload);
      recordingEngine.cleanup(activityId);
      await invalidateCachesAfterActivityChange();
      get().reset();
      return true;
    } catch (err) {
      set({ error: getApiErrorMessage(err), isSubmitting: false });
      recordingEngine.ensureEngineRunning();
      return false;
    }
  },

  remove: async () => {
    const { activityId } = get();
    if (activityId == null) return false;

    set({ isSubmitting: true, error: null });

    try {
      await deleteActivity(activityId);
      recordingEngine.cleanup(activityId);
      await invalidateCachesAfterActivityChange();
      get().reset();
      return true;
    } catch (err) {
      set({ error: getApiErrorMessage(err), isSubmitting: false });
      return false;
    }
  },

  bootstrap: async () => {
    const activities = useActivitiesStore.getState().activities;
    const inProgress = activities.find(
      (a) => a.source === "APP_TRACKED" && a.status === "IN_PROGRESS",
    );

    const storedId = getActiveRecordingId();
    const targetId = inProgress?.id ?? storedId;

    if (targetId == null) return;

    if (get().activityId === targetId && recordingEngine.getActivityId() === targetId) {
      recordingEngine.ensureEngineRunning();
      return;
    }

    await get().attach(targetId);
  },

  reset: () => {
    recordingEngine.reset();
    set({
      activityId: null,
      phase: "preparing",
      elapsedSeconds: 0,
      metrics: DEFAULT_METRICS,
      error: null,
      isLoading: false,
      isSubmitting: false,
      activityName: "Sortie vélo",
      activityTerrainType: "UNKNOWN",
    });
  },
}));

bindRecordingStore({
  setState: (partial) => useRecordingStore.setState(partial),
});

export function useHasActiveRecording(): boolean {
  return useRecordingStore((state) => state.activityId !== null);
}

export type { RecordingMetrics, RecordingPhase };
