import { useEffect, useState } from "react";
import { fetchActivity } from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import type { ActivityDetail } from "../types/activity";

export function useActivity(activityId: number) {
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(activityId)) {
      setActivity(null);
      setError("Activité introuvable");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchActivity(activityId);
        if (!cancelled) {
          setActivity(data);
        }
      } catch (err) {
        if (!cancelled) {
          setActivity(null);
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [activityId]);

  return { activity, isLoading, error };
}
