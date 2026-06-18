import PageShell from "../../components/layout/PageShell";
import ActiveTiresSection from "../../components/dashboard/ActiveTiresSection";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import RecentActivitiesSection from "../../components/dashboard/RecentActivitiesSection";
import LoyaltyCard from "../../components/loyalty/LoyaltyCard";
import StravaIntegrationSection from "../../components/settings/StravaIntegrationSection";
import { useActivities } from "../../hooks/useActivities";
import { useAuth } from "../../contexts/AuthContext";
import { getUserDisplayName, sumKilometers } from "../../lib/format";
import UpcomingEventCard from "../../components/community/UpcomingEventCard";
import { useEvents } from "../../hooks/useEvents";

export default function DashboardPage() {
  const { user } = useAuth();
  const { activities, isLoading, error } = useActivities();

  const recentActivities = activities.slice(0, 2);
  const totalKm = sumKilometers(activities);
  const isStravaLinked = user?.stravaLinked === true;

  const { registrations } = useEvents();

  const nextEvent = registrations[0];

  function getDaysUntil(date: string) {
    const today = new Date();
    const eventDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const diff = eventDate.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <PageShell mainClassName="p-6 pb-28">
      <h1 className="mb-8 text-3xl font-bold">
        Bonjour {getUserDisplayName(user)}
      </h1>

      <DashboardStatsGrid
        totalKm={totalKm}
        activityCount={activities.length}
        isLoading={isLoading}
      />

      <div className="mt-4">
        <LoyaltyCard variant="compact" />
      </div>

      <div className="mt-8">
        {nextEvent ? (
          <UpcomingEventCard
            title={nextEvent.event.title}
            location={nextEvent.event.location}
            daysRemaining={getDaysUntil(nextEvent.event.date)}
          />
        ) : (
          <p className="text-sm text-neutral-600">
            Vous n'êtes inscrit à aucun événement pour le moment.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Activités récentes</h2>
      </div>

      <div className="mt-8">
        <RecentActivitiesSection
          activities={recentActivities}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="mt-8">
        <ActiveTiresSection />
      </div>

      {!isStravaLinked && (
        <div className="mt-6">
          <StravaIntegrationSection />
        </div>
      )}
    </PageShell>
  );
}
