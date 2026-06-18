import { useEffect, useState } from "react";
import {
  fetchEvents,
  fetchMyEventRegistrations,
  registerToEvent,
} from "../api/events";
import type { Event, EventRegistration } from "../types/events";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    setLoading(true);

    const [eventsData, registrationsData] = await Promise.all([
      fetchEvents(),
      fetchMyEventRegistrations(),
    ]);

    setEvents(eventsData);
    setRegistrations(registrationsData);
    setLoading(false);
  }

  async function participate(eventId: string) {
    const registration = await registerToEvent(eventId);

    setRegistrations((prev) => [...prev, registration]);
  }

  useEffect(() => {
    void loadEvents();
  }, []);

  return {
    events,
    registrations,
    loading,
    participate,
  };
}