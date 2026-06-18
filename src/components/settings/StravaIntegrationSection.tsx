import StravaConnectButton from "../integrations/StravaConnectButton";

export default function StravaIntegrationSection() {
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
