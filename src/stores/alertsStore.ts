import { create } from "zustand";
import { checkAlert, fetchUserAlerts } from "../api/alerts";
import { resolveAlertUserTireId } from "../lib/alert-utils";
import { getApiErrorMessage } from "../lib/errors";
import type { Alert } from "../types/alert";
import { useUserTiresStore } from "./userTiresStore";

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
      const rawAlerts = await fetchUserAlerts();
      const tires = useUserTiresStore.getState().tires;
      const alerts = rawAlerts.map((alert) => ({
        ...alert,
        userTireId:
          resolveAlertUserTireId(alert, tires) ?? alert.userTireId,
      }));
      set({ alerts, isLoading: false });
    } catch (err) {
      set({ error: getApiErrorMessage(err), isLoading: false });
    }
  },

  markAsRead: async (alertId: number) => {
    set({ checkingId: alertId, error: null });

    try {
      const updated = await checkAlert(alertId);
      const tires = useUserTiresStore.getState().tires;
      const enriched: Alert = {
        ...updated,
        userTireId:
          resolveAlertUserTireId(updated, tires) ?? updated.userTireId,
      };
      set((state) => ({
        alerts: state.alerts.map((alert) =>
          alert.id === alertId ? enriched : alert,
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
