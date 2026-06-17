export type RecordingPhase = "preparing" | "recording" | "paused";

export type RecordingMetrics = {
  speedKmh: number;
  distanceKm: number;
  elevationGainM: number;
  currentElevationM: number;
};

export type StoredRecordingState = {
  activityId: number;
  phase: RecordingPhase;
  recordingStartedAt: number | null;
  pausedDurationMs: number;
  pauseStartedAt: number | null;
  elapsedSeconds: number;
  metrics: RecordingMetrics;
  totalDistanceM: number;
  elevationGainM: number;
  lastAltitude: number | null;
};

function storageKey(activityId: number): string {
  return `michelin-activity-recording:${activityId}`;
}

export function loadRecordingState(
  activityId: number,
): StoredRecordingState | null {
  try {
    const raw = localStorage.getItem(storageKey(activityId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredRecordingState;
    if (parsed.activityId !== activityId) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveRecordingState(state: StoredRecordingState): void {
  localStorage.setItem(storageKey(state.activityId), JSON.stringify(state));
}

export function clearRecordingState(activityId: number): void {
  localStorage.removeItem(storageKey(activityId));
}
