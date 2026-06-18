import { Link } from "react-router-dom";
import ActivityCard from "../activities/ActivityCard";
import EmptyState from "../ui/EmptyState";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import type { Activity } from "../../types/activity";

type RecentActivitiesSectionProps = {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
};

export default function RecentActivitiesSection({
  activities,
  isLoading,
  error,
}: RecentActivitiesSectionProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activités récentes</h2>

        <Link
          to="/activites"
          className="text-sm font-semibold text-neutral-600 underline"
        >
          Voir plus
        </Link>
      </div>

      {isLoading && <LoadingMessage />}

      {error && <ErrorAlert message={error} />}

      {!isLoading && !error && activities.length === 0 && (
        <EmptyState message="Aucune activité pour le moment. Connectez Strava ou ajoutez une sortie depuis la page Activités." />
      )}

      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </section>
  );
}
