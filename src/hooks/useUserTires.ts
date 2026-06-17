import { useCallback, useEffect, useState } from "react";
import { fetchUserTires } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { UserTire } from "../types/tire";

export function useUserTires(enabled = true) {
  const [tires, setTires] = useState<UserTire[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      setTires(await fetchUserTires());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setTires([]);
      setError(null);
      return;
    }

    void refresh();
  }, [enabled, refresh]);

  return { tires, isLoading, error, refresh };
}
