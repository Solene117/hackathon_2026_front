import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import Header from "../components/Header";
import ActivityCard from "../components/ActivityCard";
import { startActivity } from "../api/activities";
import { useActivities } from "../hooks/useActivities";
import { getApiErrorMessage } from "../lib/errors";

export default function Activities() {
  const { activities, isLoading, error, refresh } = useActivities();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  async function handleRefresh() {
    setActionError(null);
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  }

  async function handleStartActivity() {
    setActionError(null);
    setIsStarting(true);

    try {
      await startActivity({ name: "Sortie vélo" });
      await refresh();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-5 pb-24">
        <h1 className="mb-5 text-2xl font-bold">Mes activités</h1>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => void handleStartActivity()}
            disabled={isStarting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#00205B] disabled:opacity-60"
          >
            <Plus size={18} />
            {isStarting ? "Démarrage..." : "Nouvelle sortie"}
          </button>

          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#27509B] px-4 py-3 text-sm font-semibold text-[#27509B] hover:bg-neutral-50 disabled:opacity-60"
          >
            <RefreshCw size={18} />
            {isRefreshing ? "Sync..." : "Sync Strava"}
          </button>
        </div>

        {(error || actionError) && (
          <p className="mb-4 text-sm text-red-600" role="alert">
            {error ?? actionError}
          </p>
        )}

        <section className="space-y-4 rounded-xl border border-neutral-300 p-5">
          {isLoading && (
            <p className="text-sm text-neutral-600">Chargement...</p>
          )}

          {!isLoading && activities.length === 0 && (
            <p className="text-sm text-neutral-600">
              Aucune activité. Connectez Strava ou démarrez une nouvelle sortie.
            </p>
          )}

          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </section>
      </main>
    </div>
  );
}
