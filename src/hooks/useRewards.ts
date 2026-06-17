import { useCallback, useEffect, useState } from "react";
import { fetchRewards, redeemReward } from "../api/rewards";
import { getApiErrorMessage } from "../lib/errors";
import type { Reward } from "../types/loyalty";

export function useRewards(enabled = true) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      setRewards(await fetchRewards());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  const redeem = useCallback(async (rewardId: number) => {
    setPendingId(rewardId);
    setError(null);

    try {
      const updated = await redeemReward(rewardId);
      setRewards((current) =>
        current.map((reward) => (reward.id === rewardId ? updated : reward)),
      );
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setPendingId(null);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setRewards([]);
      setError(null);
      return;
    }

    void refresh();
  }, [enabled, refresh]);

  return { rewards, isLoading, error, refresh, redeem, pendingId };
}
