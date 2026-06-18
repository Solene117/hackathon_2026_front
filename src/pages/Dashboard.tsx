import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ActivityCard from "../components/ActivityCard";
import TireCard from "../components/TireCard";
import AlertsWidget from "../components/AlertsWidget";
import StravaConnectButton from "../components/StravaConnectButton";
import LoyaltyCard from "../components/LoyaltyCard";
import { useActivities } from "../hooks/useActivities";
import { getUserDisplayName, sumKilometers } from "../lib/format";
import { useAuth } from "../contexts/AuthContext";
import { useUserTires } from "../hooks/useUserTires";

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const { activities, isLoading, error } = useActivities();
  const { tires, isLoading: isTireLoading, error: tiresError } = useUserTires();

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);
  const recentActivities = activities.slice(0, 2);
  const totalKm = sumKilometers(activities);
  const activeTires = tires.filter((tire) => tire.isActive === true);
  const hasStravaActivities = activities.some(
    (activity) => activity.source === "STRAVA",
  );

  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-6 pb-24">
        <h1 className="mb-8 text-3xl font-bold">
          Bonjour {getUserDisplayName(user)}
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-4">
            <strong className="block text-2xl">
              {isLoading ? "…" : Math.round(totalKm)}
            </strong>
            <span className="mt-2 block text-sm text-neutral-700">
              km parcourus
            </span>
          </div>

          <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-4">
            <strong className="block text-2xl">
              {isLoading ? "…" : activities.length}
            </strong>
            <span className="mt-2 block text-sm text-neutral-700">
              activités enregistrées
            </span>
          </div>
        </div>

        <div className="mt-4">
          <LoyaltyCard variant="compact" />
        </div>

        {!hasStravaActivities && !isLoading && (
          <section className="mt-6 rounded-xl border border-neutral-300 p-5">
            <h2 className="text-lg font-bold">Connecter Strava</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Importez vos sorties pour alimenter vos statistiques.
            </p>
            <div className="mt-4">
              <StravaConnectButton />
            </div>
          </section>
        )}

        <div className="mt-8">
          <AlertsWidget />
        </div>

        <section className="mt-8 rounded-xl border border-neutral-300 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Activités récentes</h2>

            <Link
              to="/activites"
              className="text-sm font-semibold text-neutral-600 underline"
            >
              Voir plus
            </Link>
          </div>

          {isLoading && (
            <p className="text-sm text-neutral-600">Chargement...</p>
          )}

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && recentActivities.length === 0 && (
            <p className="text-sm text-neutral-600">
              Aucune activité pour le moment. Connectez Strava ou ajoutez une
              sortie depuis la page Activités.
            </p>
          )}

          {recentActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </section>

        {isTireLoading && (
          <p className="mt-8 text-sm text-neutral-600">Chargement...</p>
        )}

        {tiresError && (
          <p className="mt-8 text-sm text-red-600" role="alert">
            {tiresError}
          </p>
        )}

        {!isTireLoading &&
          !tiresError &&
          tires.length > 0 &&
          activeTires.length === 0 && (
            <p className="mt-8 text-sm text-neutral-600">
              Aucun pneu actif pour le moment.
            </p>
          )}

        {!tiresError && !isTireLoading && activeTires.length > 0 && (
          <section className="mt-8 rounded-xl border border-neutral-300 p-5">
            <h2 className="mb-4 text-2xl font-bold">Pneus actifs</h2>
            <div className="space-y-4">
              {activeTires.map((tire) => (
                <TireCard
                  key={tire.id}
                  userTireId={tire.id}
                  name={tire.model}
                  status={tire.isActive ? "Actif" : "Inactif"}
                  health={tire.health}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
