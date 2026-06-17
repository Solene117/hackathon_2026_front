import { useCallback, useEffect, useState } from "react";
import { fetchRetails } from "../api/retails";
import { getApiErrorMessage } from "../lib/errors";
import type { Retail } from "../types/retail";

export function useRetails() {
  const [retails, setRetails] = useState<Retail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setRetails(await fetchRetails());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { retails, isLoading, error, refresh };
}
