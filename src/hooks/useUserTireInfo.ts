import { useCallback, useEffect, useState } from "react";
import { fetchUserTireInfo } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { UserTireInfo } from "../types/tire";

export function useUserTireInfo(tireId: number | null) {
  const [tireInfo, setTireInfo] = useState<UserTireInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (tireId === null) {
      setTireInfo(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserTireInfo(tireId);
      setTireInfo(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setTireInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [tireId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  return { tireInfo, isLoading, error, refresh };
}
