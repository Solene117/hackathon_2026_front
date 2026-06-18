import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import ActivityCard from "../../components/activities/ActivityCard";
import ErrorAlert from "../../components/ui/ErrorAlert";
import EmptyState from "../../components/ui/EmptyState";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { startActivity } from "../../api/activities";
import { useActivities } from "../../hooks/useActivities";
import { invalidateAfterActivityChange } from "../../stores";
import { getApiErrorMessage } from "../../lib/errors";
import tireLifeIcon from "../../assets/tire_life.svg";

export default function ActivitiesPage() {
  const navigate = useNavigate();
  const { activities, isLoading, error } = useActivities();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleRefresh() {
    setIsRefreshing(true);
    await invalidateAfterActivityChange();
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
    <PageShell mainClassName="p-5 pb-28">
      <SectionHeader
        title="Mes activités"
        subtitle="Suivez vos sorties et synchronisez Strava"
        icon={
          <img
            src={tireLifeIcon}
            alt=""
            aria-hidden
            className="h-5 w-5"
            style={{ filter: "brightness(0) saturate(100%) invert(54%) sepia(97%) saturate(401%) hue-rotate(47deg)" }}
          />
        }
      />

      {/* Actions */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => void handleNewActivity()}
          disabled={isStarting}
          className="flex items-center justify-center gap-2 rounded-full bg-michelin-green px-4 py-3 text-sm font-bold text-white shadow-sm shadow-green-200/60 transition hover:opacity-90 disabled:opacity-50 active:scale-[0.98]"
        >
          <Plus size={17} />
          {isStarting ? "Création..." : "Nouvelle sortie"}
        </button>

        <button
          type="button"
          onClick={() => void handleRefresh()}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 active:scale-[0.98]"
        >
          <RefreshCw size={17} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Sync..." : "Sync Strava"}
        </button>
      </div>

      {(error || actionError) && (
        <ErrorAlert message={error ?? actionError ?? ""} className="mb-4" />
      )}

      {/* Liste des activités */}
      <div className="space-y-3">
        {isLoading && <LoadingMessage />}

        {!isLoading && activities.length === 0 && (
          <EmptyState message="Aucune activité. Connectez Strava ou démarrez une nouvelle sortie." />
        )}

        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </PageShell>
  );
}
