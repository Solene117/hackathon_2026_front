import { create } from "zustand";
import { checkAlert, fetchUserAlerts } from "../api/alerts";
import { getApiErrorMessage } from "../lib/errors";
import type { Alert } from "../types/alert";

type AlertsState = {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  checkingId: number | null;

  fetchAlerts: () => Promise<void>;
  markAsRead: (alertId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  reset: () => void;
};

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
  checkingId: null,

  fetchAlerts: async () => {
    set({ isLoading: true, error: null });

    try {
      const alerts = await fetchUserAlerts();
      set({ alerts, isLoading: false });
    } catch (err) {
      set({ error: getApiErrorMessage(err), isLoading: false });
    }
  },

  markAsRead: async (alertId: number) => {
    set({ checkingId: alertId, error: null });

    try {
      const updated = await checkAlert(alertId);
      set((state) => ({
        alerts: state.alerts.map((alert) =>
          alert.id === alertId ? updated : alert,
        ),
        checkingId: null,
      }));
    } catch (err) {
      set({ error: getApiErrorMessage(err), checkingId: null });
    }
  },

  openModal: () => {
    set({ isModalOpen: true });
    void get().fetchAlerts();
  },

  closeModal: () => set({ isModalOpen: false }),

  reset: () =>
    set({
      alerts: [],
      isLoading: false,
      error: null,
      isModalOpen: false,
      checkingId: null,
    }),
}));

export function selectUncheckedAlerts(alerts: Alert[]) {
  return alerts.filter((alert) => !alert.isChecked);
}

export function useUncheckedAlertsCount() {
  return useAlertsStore(
    (state) => selectUncheckedAlerts(state.alerts).length,
  );
}
