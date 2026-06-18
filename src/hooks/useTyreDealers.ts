import { useCallback, useEffect, useState } from "react";
import { fetchTyreDealers } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { Dealer } from "../types/dealer";

export function useTyreDealers(tyreId: number | null) {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (tyreId === null) {
      setDealers([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setDealers(await fetchTyreDealers(tyreId));
    } catch (err) {
      setError(getApiErrorMessage(err));
      setDealers([]);
    } finally {
      setIsLoading(false);
    }
  }, [tyreId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { dealers, isLoading, error, refresh };
}
