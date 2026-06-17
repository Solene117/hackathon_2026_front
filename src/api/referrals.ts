import { api } from "./client";
import type { ReferralOverview } from "../types/loyalty";

export function fetchReferralOverview(): Promise<ReferralOverview> {
  return api<ReferralOverview>("/api/referrals/me");
}

export function validateReferralCode(
  code: string,
): Promise<{ valid: boolean }> {
  return api<{ valid: boolean }>(
    `/api/referrals/validate/${encodeURIComponent(code)}`,
  );
}
