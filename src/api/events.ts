import { api } from "./client";
import type { Event, EventRegistration } from "../types/events";

export function fetchEvents(): Promise<Event[]> {
  return api<Event[]>("/api/events");
}

export function registerToEvent(eventId: string): Promise<EventRegistration> {
  return api<EventRegistration>(`/api/events/${eventId}/register`, {
    method: "POST",
  });
}

export function fetchMyEventRegistrations(): Promise<EventRegistration[]> {
  return api<EventRegistration[]>("/api/events/me/registrations");
}