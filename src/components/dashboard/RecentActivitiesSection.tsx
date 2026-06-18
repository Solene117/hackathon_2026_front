import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ActivityCard from "../activities/ActivityCard";
import HorizontalSlider from "../ui/HorizontalSlider";
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
    <section>
      {/* En-tête */}
      <div className="mb-4 flex items-center justify-between px-0">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Activités récentes</h2>
          {!isLoading && activities.length > 0 && (
            <p className="mt-0.5 text-sm text-neutral-500">
              {activities.length} dernière{activities.length > 1 ? "s" : ""} sortie{activities.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Link
          to="/activites"
          className="flex items-center gap-0.5 text-sm font-semibold text-michelin-blue transition hover:text-michelin-blue-dark-03"
        >
          Voir tout <ChevronRight size={16} />
        </Link>
      </div>

      {isLoading && <LoadingMessage />}
      {error && <ErrorAlert message={error} className="mb-2" />}

      {!isLoading && !error && activities.length === 0 && (
        <EmptyState message="Aucune activité pour le moment. Connectez Strava ou démarrez une nouvelle sortie." />
      )}

      {!isLoading && !error && activities.length > 0 && (
        <HorizontalSlider
          showEdgeFade={false}
          showDots={activities.length > 1}
          gapClassName="gap-3"
          trackClassName="-mx-2 px-2"
        >
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              variant="slide"
            />
          ))}
        </HorizontalSlider>
      )}
    </section>
  );
}
