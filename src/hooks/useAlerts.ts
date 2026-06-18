import { useCallback, useEffect, useState } from "react";
import { fetchTireAlerts, fetchUserAlerts } from "../api/alerts";
import { getApiErrorMessage } from "../lib/errors";
import type { Alert } from "../types/alert";

export function useAlerts(tireId?: number) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        tireId !== undefined
          ? await fetchTireAlerts(tireId)
          : await fetchUserAlerts();
      setAlerts(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [tireId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { alerts, isLoading, error, refresh };
}
