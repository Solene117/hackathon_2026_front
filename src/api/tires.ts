import { api } from "./client";
import type { TireDetail, UserTire } from "../types/tire";

export function fetchUserTires(): Promise<UserTire[]> {
  return api<UserTire[]>("/api/tires/mine");
}

export function fetchTireModelDetail(id: number): Promise<TireDetail> {
  return api<TireDetail>(`/api/tires/model/${id}`);
}
