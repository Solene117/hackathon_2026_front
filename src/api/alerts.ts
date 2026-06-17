import { api } from "./client";
import type { Alert } from "../types/alert";

export function fetchUserAlerts(): Promise<Alert[]> {
  return api<Alert[]>("/api/alerts");
}

export function fetchTireAlerts(tireId: number): Promise<Alert[]> {
  return api<Alert[]>(`/api/alerts/tire/${tireId}`);
}

export function checkAlert(alertId: number): Promise<Alert> {
  return api<Alert>(`/api/alerts/${alertId}`, { method: "PATCH" });
}
