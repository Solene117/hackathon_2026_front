import { Link, useSearchParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import StravaIntegrationSection from "../../components/settings/StravaIntegrationSection";
import StravaStatusMessage from "../../components/settings/StravaStatusMessage";
import { STRAVA_STATUS_MESSAGES } from "../../lib/strava-status";

export default function SettingsPage() {
  const [params] = useSearchParams();
  const stravaStatus = params.get("strava");
  const message = stravaStatus ? STRAVA_STATUS_MESSAGES[stravaStatus] : null;

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
