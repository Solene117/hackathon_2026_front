import { api } from "./client";
import type {
  TireDetail,
  UserTire,
  UserTireInfo,
  UserTireWear,
} from "../types/tire";

export function fetchUserTires(): Promise<UserTire[]> {
  return api<UserTire[]>("/api/tires/mine");
}

export function fetchTireModelDetail(id: number): Promise<TireDetail> {
  return api<TireDetail>(`/api/tires/model/${id}`);
}

export function fetchUserTireInfo(id: number): Promise<UserTireInfo> {
  return api<UserTireInfo>(`/api/tires/mine/${id}/info`);
}

export function fetchUserTireWear(id: number): Promise<UserTireWear> {
  return api<UserTireWear>(`/api/tires/mine/${id}/wear`);
}
