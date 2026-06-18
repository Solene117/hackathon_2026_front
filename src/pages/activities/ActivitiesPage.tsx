import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import PageShell from "../../components/layout/PageShell";
import ActivityCard from "../../components/activities/ActivityCard";
import ErrorAlert from "../../components/ui/ErrorAlert";
import EmptyState from "../../components/ui/EmptyState";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { startActivity } from "../../api/activities";
import { useActivities } from "../../hooks/useActivities";
import { getApiErrorMessage } from "../../lib/errors";

export default function ActivitiesPage() {
  const navigate = useNavigate();
  const { activities, isLoading, error, refresh } = useActivities();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleRefresh() {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  }

  async function handleNewActivity() {
    setActionError(null);
    setIsStarting(true);

    try {
      const activity = await startActivity({ name: "Sortie vélo" });
      navigate(`/activites/${activity.id}`);
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <PageShell title="MICHELIN Ride Companion">
      <h1 className="mb-5 text-2xl font-bold">Mes activités</h1>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => void handleNewActivity()}
          disabled={isStarting}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#00205B] disabled:opacity-60"
        >
          <Plus size={18} />
          {isStarting ? "Création..." : "Nouvelle sortie"}
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
        <ErrorAlert message={error ?? actionError ?? ""} className="mb-4" />
      )}

      <section className="space-y-4 rounded-xl border border-neutral-300 p-5">
        {isLoading && <LoadingMessage />}

        {!isLoading && activities.length === 0 && (
          <EmptyState message="Aucune activité. Connectez Strava ou démarrez une nouvelle sortie." />
        )}

        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </section>
    </PageShell>
  );
}
