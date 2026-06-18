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

const ACTIVE_RECORDING_KEY = "michelin-active-recording-id";

function storageKey(activityId: number): string {
  return `michelin-activity-recording:${activityId}`;
}

export function getActiveRecordingId(): number | null {
  try {
    const raw = localStorage.getItem(ACTIVE_RECORDING_KEY);
    if (!raw) return null;
    const id = Number(raw);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
}

export function setActiveRecordingId(activityId: number): void {
  localStorage.setItem(ACTIVE_RECORDING_KEY, String(activityId));
}

export function clearActiveRecordingId(): void {
  localStorage.removeItem(ACTIVE_RECORDING_KEY);
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
