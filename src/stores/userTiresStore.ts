import { create } from "zustand";
import { fetchUserTires } from "../api/tires";
import { getApiErrorMessage } from "../lib/errors";
import type { UserTire } from "../types/tire";

type FetchOptions = {
  force?: boolean;
};

type UserTiresState = {
  tires: UserTire[];
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  fetchTires: (options?: FetchOptions) => Promise<void>;
  reset: () => void;
};

const initialState = {
  tires: [] as UserTire[],
  isLoading: false,
  error: null as string | null,
  lastFetchedAt: null as number | null,
};

export const useUserTiresStore = create<UserTiresState>((set, get) => ({
  ...initialState,

  fetchTires: async ({ force = false } = {}) => {
    const { lastFetchedAt, isLoading, tires } = get();

    if (
      !force &&
      !isLoading &&
      lastFetchedAt !== null &&
      tires.length > 0 &&
      Date.now() - lastFetchedAt < 30_000
    ) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await fetchUserTires();
      set({
        tires: data,
        isLoading: false,
        lastFetchedAt: Date.now(),
      });
    } catch (err) {
      set({ error: getApiErrorMessage(err), isLoading: false });
    }
  },

  reset: () => set(initialState),
}));

export function selectActiveTires(tires: UserTire[]) {
  return tires.filter((tire) => tire.isActive);
}
