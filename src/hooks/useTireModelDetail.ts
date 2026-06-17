import { useCallback, useEffect, useState } from "react";
import { fetchTireModelDetail } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { TireDetail } from "../types/tire";

export function useTireModelDetail(tireId: number | null) {
  const [tire, setTire] = useState<TireDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (tireId === null) {
      setTire(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTireModelDetail(tireId);
      setTire(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setTire(null);
    } finally {
      setIsLoading(false);
    }
  }, [tireId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { tire, isLoading, error, refresh };
}
