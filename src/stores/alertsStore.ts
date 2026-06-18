import { create } from "zustand";
import { checkAlert, fetchUserAlerts } from "../api/alerts";
import { resolveAlertUserTireId } from "../lib/alert-utils";
import { getApiErrorMessage } from "../lib/errors";
import type { Alert } from "../types/alert";
import { useUserTiresStore } from "./userTiresStore";

type AlertsState = {
  alerts: Alert[];
  /** Masquées localement après clic (réapparaissent au refresh tant que non « Lu »). */
  dismissedAlertIds: number[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  checkingId: number | null;

  fetchAlerts: () => Promise<void>;
  dismissAlert: (alertId: number) => void;
  markAsRead: (alertId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  reset: () => void;
};

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: [],
  dismissedAlertIds: [],
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

  dismissAlert: (alertId: number) => {
    set((state) => ({
      dismissedAlertIds: state.dismissedAlertIds.includes(alertId)
        ? state.dismissedAlertIds
        : [...state.dismissedAlertIds, alertId],
    }));
  },

  markAsRead: async (alertId: number) => {
    set({ checkingId: alertId, error: null });

    try {
      await checkAlert(alertId);
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== alertId),
        dismissedAlertIds: state.dismissedAlertIds.filter((id) => id !== alertId),
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
      dismissedAlertIds: [],
      isLoading: false,
      error: null,
      isModalOpen: false,
      checkingId: null,
    }),
}));

export function selectUncheckedAlerts(alerts: Alert[]) {
  return alerts.filter((alert) => !alert.isChecked);
}

export function selectVisibleAlerts(
  alerts: Alert[],
  dismissedAlertIds: number[],
) {
  const dismissed = new Set(dismissedAlertIds);
  return selectUncheckedAlerts(alerts).filter((alert) => !dismissed.has(alert.id));
}

export function useUncheckedAlertsCount() {
  return useAlertsStore(
    (state) =>
      selectVisibleAlerts(state.alerts, state.dismissedAlertIds).length,
  );
}
