import { create } from "zustand";
import {
  fetchEvents,
  fetchMyEventRegistrations,
  registerToEvent,
} from "../api/events";
import { getApiErrorMessage } from "../lib/errors";
import type { Event, EventRegistration } from "../types/events";

type FetchOptions = {
  force?: boolean;
};

type EventsState = {
  events: Event[];
  registrations: EventRegistration[];
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  fetchEvents: (options?: FetchOptions) => Promise<void>;
  participate: (eventId: string) => Promise<void>;
  reset: () => void;
};

const initialState = {
  events: [] as Event[],
  registrations: [] as EventRegistration[],
  isLoading: false,
  error: null as string | null,
  lastFetchedAt: null as number | null,
};

export const useEventsStore = create<EventsState>((set, get) => ({
  ...initialState,

  fetchEvents: async ({ force = false } = {}) => {
    const { lastFetchedAt, isLoading } = get();

    if (
      !force &&
      !isLoading &&
      lastFetchedAt !== null &&
      Date.now() - lastFetchedAt < 30_000
    ) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const [events, registrations] = await Promise.all([
        fetchEvents(),
        fetchMyEventRegistrations(),
      ]);

      set({
        events,
        registrations,
        isLoading: false,
        lastFetchedAt: Date.now(),
      });
    } catch (err) {
      set({ error: getApiErrorMessage(err), isLoading: false });
    }
  },

  participate: async (eventId: string) => {
    const registration = await registerToEvent(eventId);
    set((state) => ({
      registrations: [...state.registrations, registration],
    }));
  },

  reset: () => set(initialState),
}));
