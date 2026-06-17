import { useCallback, useEffect, useState } from "react";
import { fetchActivities } from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import type { Activity } from "../types/activity";

export function useActivities(enabled = true) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      setActivities(await fetchActivities());
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setActivities([]);
      setError(null);
      return;
    }

    void refresh();
  }, [enabled, refresh]);

  return { activities, isLoading, error, refresh };
}
