import { create } from "zustand";
import { fetchActivities } from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import type { Activity } from "../types/activity";

type FetchOptions = {
  force?: boolean;
};

type ActivitiesState = {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  fetchActivities: (options?: FetchOptions) => Promise<void>;
  reset: () => void;
};

const initialState = {
  activities: [] as Activity[],
  isLoading: false,
  error: null as string | null,
  lastFetchedAt: null as number | null,
};

export const useActivitiesStore = create<ActivitiesState>((set, get) => ({
  ...initialState,

  fetchActivities: async ({ force = false } = {}) => {
    const { lastFetchedAt, isLoading, activities } = get();

    if (
      !force &&
      !isLoading &&
      lastFetchedAt !== null &&
      activities.length > 0 &&
      Date.now() - lastFetchedAt < 30_000
    ) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await fetchActivities();
      set({
        activities: data,
        isLoading: false,
        lastFetchedAt: Date.now(),
      });
    } catch (err) {
      set({ error: getApiErrorMessage(err), isLoading: false });
    }
  },

  reset: () => set(initialState),
}));
