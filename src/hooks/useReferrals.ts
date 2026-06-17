import { useCallback, useEffect, useState } from "react";
import { fetchReferralOverview } from "../api/referrals";
import { getApiErrorMessage } from "../lib/errors";
import type { ReferralOverview } from "../types/loyalty";

export function useReferrals(enabled = true) {
  const [overview, setOverview] = useState<ReferralOverview | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      setOverview(await fetchReferralOverview());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setOverview(null);
      setError(null);
      return;
    }

    void refresh();
  }, [enabled, refresh]);

  return { overview, isLoading, error, refresh };
}
