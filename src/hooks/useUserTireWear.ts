import { useCallback, useEffect, useState } from "react";
import { fetchUserTireWear } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { UserTireWear } from "../types/tire";

export function useUserTireWear(tireId: number | null) {
  const [tireWear, setTireWear] = useState<UserTireWear | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (tireId === null) {
      setTireWear(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserTireWear(tireId);
      setTireWear(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setTireWear(null);
    } finally {
      setIsLoading(false);
    }
  }, [tireId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  return { tireWear, isLoading, error, refresh };
}
