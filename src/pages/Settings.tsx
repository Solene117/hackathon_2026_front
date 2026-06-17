import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import StravaConnectButton from "../components/StravaConnectButton";

const STRAVA_MESSAGES: Record<string, { title: string; body: string }> = {
  connected: {
    title: "Strava connecté",
    body: "Vos activités seront synchronisées automatiquement.",
  },
  denied: {
    title: "Connexion refusée",
    body: "Vous avez annulé la liaison avec Strava.",
  },
  error: {
    title: "Erreur de connexion",
    body: "Impossible de finaliser la liaison Strava. Réessayez.",
  },
};

export default function Settings() {
  const [params] = useSearchParams();
  const stravaStatus = params.get("strava");
  const message = stravaStatus ? STRAVA_MESSAGES[stravaStatus] : null;

  return (
    <div>
      <Header title="Paramètres" />

      <main className="space-y-5 p-5 pb-24">
        <h1 className="text-2xl font-bold">Intégrations</h1>

        {message && (
          <section className="rounded-xl border border-neutral-300 p-5">
            <h2 className="text-lg font-bold">{message.title}</h2>
            <p className="mt-2 text-sm text-neutral-700">{message.body}</p>
          </section>
        )}

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

        <Link
          to="/dashboard"
          className="block text-center text-sm font-semibold text-[#27509B] underline"
        >
          Retour au tableau de bord
        </Link>
      </main>
    </div>
  );
}
