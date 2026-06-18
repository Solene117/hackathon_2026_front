import { Link, useSearchParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import StravaIntegrationSection from "../../components/settings/StravaIntegrationSection";
import StravaStatusMessage from "../../components/settings/StravaStatusMessage";

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

export default function SettingsPage() {
  const [params] = useSearchParams();
  const stravaStatus = params.get("strava");
  const message = stravaStatus ? STRAVA_MESSAGES[stravaStatus] : null;

  return (
    <PageShell title="Paramètres" mainClassName="space-y-5 p-5 pb-24">
      <h1 className="text-2xl font-bold">Intégrations</h1>

      {message && (
        <StravaStatusMessage title={message.title} body={message.body} />
      )}

      <StravaIntegrationSection />

      <Link
        to="/dashboard"
        className="block text-center text-sm font-semibold text-[#27509B] underline"
      >
        Retour au tableau de bord
      </Link>
    </PageShell>
  );
}
