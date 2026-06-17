import { api } from "./client";
import type { Reward } from "../types/loyalty";

export function fetchRewards(): Promise<Reward[]> {
  return api<Reward[]>("/api/rewards/me");
}

export function redeemReward(rewardId: number): Promise<Reward> {
  return api<Reward>(`/api/rewards/${rewardId}/use`, {
    method: "PATCH",
  });
}
