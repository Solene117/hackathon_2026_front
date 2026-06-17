import { useCallback, useEffect, useState } from "react";
import { fetchInfluencerDashboard } from "../api/influencer";
import { getApiErrorMessage } from "../lib/errors";
import type { InfluencerDashboard } from "../types/loyalty";

export function useInfluencerDashboard(enabled = true) {
  const [dashboard, setDashboard] = useState<InfluencerDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      setDashboard(await fetchInfluencerDashboard());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setDashboard(null);
      setError(null);
      return;
    }

    void refresh();
  }, [enabled, refresh]);

  return { dashboard, isLoading, error, refresh };
}
