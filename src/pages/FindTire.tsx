import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Plus } from "lucide-react";
import StravaConnectButton from "../components/StravaConnectButton";
import { useActivities } from "../hooks/useActivities";
import { useAuth } from "../contexts/AuthContext";

export default function FindTire() {
  const { isAuthenticated } = useAuth();
  const { activities, isLoading } = useActivities(isAuthenticated);
  const hasStravaActivities = activities.some(
    (activity) => activity.source === "STRAVA",
  );

  return (
    <div>
      <Header title="Trouver mon pneu" />

      <main className="space-y-5 p-5 pb-24">
        <section className="rounded-xl border border-neutral-300 p-5">
          <h1 className="text-2xl font-bold">Votre profil de pratique</h1>

          <div className="mt-5 space-y-4">
            <Field label="Type de vélo" value="Gravel" />
            <Field label="Terrain principal" value="Routes + chemins mixtes" />

            <div>
              <label className="text-xs text-neutral-500">Priorité</label>
              <div className="mt-2 flex gap-2">
                <Chip>Durabilité</Chip>
                <Chip>Grip</Chip>
                <Chip><Plus size={14}/></Chip>
              </div>
            </div>

            <Field label="Fréquence" value="3 sorties / semaines" />
          </div>
        </section>

        <section className="rounded-xl border border-neutral-300 p-5">
          <h2 className="text-2xl font-bold">Données connectées</h2>

          <div className="mt-4 space-y-3 text-sm">
            {!isAuthenticated && (
              <p>
                <Link to="/login" className="font-semibold text-[#27509B] underline">
                  Connectez-vous
                </Link>{" "}
                pour lier Strava et importer vos sorties.
              </p>
            )}

            {isAuthenticated && isLoading && (
              <p className="text-neutral-600">Chargement des activités...</p>
            )}

            {isAuthenticated && !isLoading && hasStravaActivities && (
              <p className="font-semibold text-green-700">Strava connecté</p>
            )}

            {isAuthenticated && !isLoading && !hasStravaActivities && (
              <>
                <p className="text-neutral-700">
                  Liez Strava pour analyser vos dernières sorties.
                </p>
                <StravaConnectButton />
              </>
            )}

            <p className="pt-2 text-neutral-600">
              Analyse basée sur vos dernières sorties pour affiner la
              recommandation.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-300 p-5">
          <h2 className="text-2xl font-bold">Votre pneu recommandé</h2>

          <div className="mt-4 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

          <h3 className="mt-4 text-xl font-bold">Michelin Power Gravel</h3>
          <p className="mt-2 text-sm text-neutral-700">
            Adapté à votre pratique mixte route / chemins.
          </p>

          <h4 className="mt-4 font-bold">Pourquoi ce choix ?</h4>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Durabilité</Chip>
            <Chip>Grip</Chip>
            <Chip>Résistance renforcée</Chip>
          </div>

          <Link to="/retailers">
            <button className="mt-5 w-full rounded-lg bg-[#27509B] hover:bg-[#1a3d7a] px-4 py-3 text-sm font-bold text-white">
              Voir les revendeurs
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-neutral-500">{label}</label>
      <select className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-3 text-sm">
        <option>{value}</option>
      </select>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
      {children}
    </span>
  );
}
