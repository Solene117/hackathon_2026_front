import { useActivitiesStore } from "./activitiesStore";
import { useAlertsStore } from "./alertsStore";
import { useUserTiresStore } from "./userTiresStore";

/** Réinitialise tous les stores métier (appelé au logout). */
export function resetAllStores() {
  useAlertsStore.getState().reset();
  useActivitiesStore.getState().reset();
  useUserTiresStore.getState().reset();
}

/** Charge les données partagées après authentification. */
export async function bootstrapAuthenticatedData() {
  await Promise.all([
    useActivitiesStore.getState().fetchActivities({ force: true }),
    useUserTiresStore.getState().fetchTires({ force: true }),
    useAlertsStore.getState().fetchAlerts(),
  ]);
}

/** Invalide les caches après une activité (finish, sync Strava, etc.). */
export async function invalidateAfterActivityChange() {
  await Promise.all([
    useActivitiesStore.getState().fetchActivities({ force: true }),
    useAlertsStore.getState().fetchAlerts(),
    useUserTiresStore.getState().fetchTires({ force: true }),
  ]);
}
