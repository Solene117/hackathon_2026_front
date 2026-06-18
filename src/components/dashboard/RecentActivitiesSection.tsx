import ActivityCard from "../activities/ActivityCard";
import HorizontalSlider from "../ui/HorizontalSlider";
import SectionBlock from "../ui/SectionBlock";
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
    <SectionBlock
      title="Activités récentes"
      subtitle="Vos dernières sorties en un coup d'œil"
      action={{ label: "Voir tout", to: "/activites" }}
    >
      {isLoading && <LoadingMessage />}

      {error && <ErrorAlert message={error} className="mb-4" />}

      {!isLoading && !error && activities.length === 0 && (
        <EmptyState message="Aucune activité pour le moment. Connectez Strava ou démarrez une nouvelle sortie." />
      )}

      {!isLoading && !error && activities.length > 0 && (
        <HorizontalSlider
          showEdgeFade
          showDots={activities.length > 1}
          fadeFromClassName="from-white"
          trackClassName="-mx-1 px-1"
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
    </SectionBlock>
  );
}
