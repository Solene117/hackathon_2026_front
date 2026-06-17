import { api } from "./client";
import type {
  Activity,
  FinishActivityPayload,
  StartActivityPayload,
  TerrainTypeOption,
  ActivityDetail,
} from "../types/activity";

export function fetchActivities(): Promise<Activity[]> {
  return api<Activity[]>("/api/activities");
}

export function fetchActivity(activityId: number): Promise<ActivityDetail> {
  return api<ActivityDetail>(`/api/activities/${activityId}`);
}

export function fetchTerrainTypes(): Promise<TerrainTypeOption[]> {
  return api<TerrainTypeOption[]>("/api/activities/terrain-types");
}

export function startActivity(payload: StartActivityPayload = {}): Promise<Activity> {
  return api<Activity>("/api/activities/start", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type GpsPointPayload = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  recordedAt?: string;
};

export function addGpsPoint(
  activityId: number,
  payload: GpsPointPayload,
): Promise<unknown> {
  return api(`/api/activities/${activityId}/points`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function finishActivity(
  activityId: number,
  payload: FinishActivityPayload = {},
): Promise<Activity> {
  return api<Activity>(`/api/activities/${activityId}/finish`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteActivity(activityId: number): Promise<{ deleted: boolean }> {
  return api<{ deleted: boolean }>(`/api/activities/${activityId}`, {
    method: "DELETE",
  });
}
