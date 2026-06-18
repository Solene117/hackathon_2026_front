import { api } from "./client";
import type { AiTireRecommendationResponse } from "../types/ai-tire";

const AI_REQUEST_TIMEOUT_MS = 65_000;

export function recommendTiresWithAi(
  prompt: string,
): Promise<AiTireRecommendationResponse> {
  return api<AiTireRecommendationResponse>("/api/ai/tires/recommend", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    timeoutMs: AI_REQUEST_TIMEOUT_MS,
  });
}
