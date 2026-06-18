import PageShell from "../../components/layout/PageShell";
import ActiveTiresSection from "../../components/dashboard/ActiveTiresSection";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import RecentActivitiesSection from "../../components/dashboard/RecentActivitiesSection";
import LoyaltyCard from "../../components/loyalty/LoyaltyCard";
import StravaIntegrationSection from "../../components/settings/StravaIntegrationSection";
import { useActivities } from "../../hooks/useActivities";
import { useAuth } from "../../contexts/AuthContext";
import { getUserDisplayName, sumKilometers } from "../../lib/format";

export default function DashboardPage() {
  const { user } = useAuth();
  const { activities, isLoading, error } = useActivities();

  const recentActivities = activities.slice(0, 2);
  const totalKm = sumKilometers(activities);
  const isStravaLinked = user?.stravaLinked === true;

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
