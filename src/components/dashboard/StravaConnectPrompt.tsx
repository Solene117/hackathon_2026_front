import StravaConnectButton from "../integrations/StravaConnectButton";

export default function StravaConnectPrompt() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-lg font-bold">Connecter Strava</h2>
      <p className="mt-2 text-sm text-neutral-600">
        Importez vos sorties pour alimenter vos statistiques.
      </p>
      <div className="mt-4">
        <StravaConnectButton />
      </div>
    </section>
  );
}
