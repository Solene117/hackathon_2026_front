import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import StravaConnectButton from "../integrations/StravaConnectButton";

export default function StravaIntegrationSection() {
  const { user, refreshUser } = useAuth();
  const stravaLinked = user?.stravaLinked === true;
  
  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  if (stravaLinked) {
    return (
      <section className="rounded-xl border border-neutral-300 p-5">
        <h2 className="text-lg font-bold">Strava connecté</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Vos activités Strava sont automatiquement importées dans
          l'application.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-lg font-bold">Strava</h2>
      <p className="mt-2 text-sm text-neutral-700">
        Importez vos sorties vélo pour alimenter vos statistiques et
        recommandations.
      </p>
      <div className="mt-4">
        <StravaConnectButton />
      </div>
    </section>
  );
}
