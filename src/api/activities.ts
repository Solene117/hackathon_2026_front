import { api } from "./client";
import type { Activity, StartActivityPayload } from "../types/activity";

export function fetchActivities(): Promise<Activity[]> {
  return api<Activity[]>("/api/activities");
}

export function startActivity(payload: StartActivityPayload = {}): Promise<Activity> {
  return api<Activity>("/api/activities/start", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
