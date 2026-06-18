import { useEffect } from "react";
import PageShell from "../../components/layout/PageShell";
import ActiveTiresSection from "../../components/dashboard/ActiveTiresSection";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import RecentActivitiesSection from "../../components/dashboard/RecentActivitiesSection";
import StravaConnectPrompt from "../../components/dashboard/StravaConnectPrompt";
import AlertsWidget from "../../components/tires/AlertsWidget";
import LoyaltyCard from "../../components/loyalty/LoyaltyCard";
import { useActivities } from "../../hooks/useActivities";
import { getUserDisplayName, sumKilometers } from "../../lib/format";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const { user, refreshUser } = useAuth();
  const { activities, isLoading, error } = useActivities();

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const recentActivities = activities.slice(0, 2);
  const totalKm = sumKilometers(activities);
  const hasStravaActivities = activities.some(
    (activity) => activity.source === "STRAVA",
  );

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

      {!hasStravaActivities && !isLoading && (
        <div className="mt-6">
          <StravaConnectPrompt />
        </div>
      )}

      <div className="mt-8">
        <AlertsWidget />
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
    </PageShell>
  );
}
