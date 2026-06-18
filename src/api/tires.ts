import { api } from "./client";
import type {
  TireDetail,
  UserTire,
  UserTireInfo,
  UserTireWear,
  TireCatalogItem,
} from "../types/tire";


export function searchTireCatalog(query: string): Promise<TireCatalogItem[]> {
  const params = new URLSearchParams({ q: query });
  return api<TireCatalogItem[]>(`/api/tires/catalog/search?${params}`);
}

export function addUserTire(tireId: number): Promise<UserTire> {
  return api<UserTire>("/api/tires/mine", {
    method: "POST",
    body: JSON.stringify({ tireId }),
  });
}

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

export function updateUserTireActive(
  id: number,
  isActive: boolean,
): Promise<UserTire> {
  return api<UserTire>(`/api/tires/mine/${id}/active`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });
}

export function deleteUserTire(id: number): Promise<{ deleted: boolean }> {
  return api<{ deleted: boolean }>(`/api/tires/mine/${id}`, {
    method: "DELETE",
  });
}
