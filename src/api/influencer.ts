import { api } from "./client";
import type { InfluencerDashboard } from "../types/loyalty";

export function fetchInfluencerDashboard(): Promise<InfluencerDashboard> {
  return api<InfluencerDashboard>("/api/influencer/dashboard");
}
