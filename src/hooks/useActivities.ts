import { useActivitiesStore } from "../stores/activitiesStore";

export function useActivities() {
  const activities = useActivitiesStore((state) => state.activities);
  const isLoading = useActivitiesStore((state) => state.isLoading);
  const error = useActivitiesStore((state) => state.error);
  const fetchActivities = useActivitiesStore((state) => state.fetchActivities);

  return {
    activities,
    isLoading,
    error,
    refresh: () => fetchActivities({ force: true }),
  };
}
