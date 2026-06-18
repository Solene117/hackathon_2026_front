import { useEventsStore } from "../stores/eventsStore";

export function useEvents() {
  const events = useEventsStore((state) => state.events);
  const registrations = useEventsStore((state) => state.registrations);
  const isLoading = useEventsStore((state) => state.isLoading);
  const error = useEventsStore((state) => state.error);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const participate = useEventsStore((state) => state.participate);

  return {
    events,
    registrations,
    isLoading,
    error,
    participate,
    refresh: () => fetchEvents({ force: true }),
  };
}
