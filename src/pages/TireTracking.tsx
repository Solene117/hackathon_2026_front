import { useState } from "react";
import { useParams } from "react-router-dom";
import AlertsWidget from "../components/AlertsWidget";
import Header from "../components/Header";
import RecommendationModal from "./RecommendationModal";
import MichelinProgressBar from "../components/ProgressBar";

export default function TireTracking() {
  const { tireId: tireIdParam } = useParams<{ tireId: string }>();
  const tireId = tireIdParam ? Number(tireIdParam) : undefined;
  const [showRecommendation, setShowRecommendation] = useState(false);

  return (
    <>
      {showRecommendation && (
        <RecommendationModal onClose={() => setShowRecommendation(false)} />
      )}

      <div>
        <Header title="Suivi du pneu" />

        <main className="space-y-5 p-5 pb-24">
          <section className="rounded-xl border border-neutral-300 p-5">
            <h1 className="text-2xl font-bold">Pneu actuel</h1>

            <div className="mt-4 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

            <h3 className="mt-4 text-xl font-bold">Michelin Power Gravel</h3>

            <p className="mt-1 text-sm text-neutral-700">Roue arrière</p>

            <span className="mt-3 inline-block rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
              Valve connectée active
            </span>
          </section>

          <section className="rounded-xl border border-neutral-300 p-5">
            <h2 className="text-2xl font-bold">État estimé</h2>

            <div className="mt-4 flex items-center justify-between">
              <strong className="text-3xl font-bold text-[#27509B]">42%</strong>

              <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
                Bon état
              </span>
            </div>

            <div className="mt-4">
              <MichelinProgressBar value={42} />
            </div>

            <p className="mt-4 text-sm text-neutral-600">
              Estimé à partir de vos données d’usage et des données remontées.
            </p>

            <button
              onClick={() => setShowRecommendation(true)}
              className="mt-5 w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white hover:bg-[#1a3d7a]"
            >
              Voir recommandation
            </button>
          </section>

          {tireId !== undefined && !Number.isNaN(tireId) && (
            <AlertsWidget tireId={tireId} />
          )}

          <section className="rounded-xl border border-neutral-300 p-5">
            <h2 className="text-2xl font-bold">Données d’usage</h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <UsageCard value="840 km" label="Distance" />

              <UsageCard value="4.2 bars" label="Pression" />

              <UsageCard value="Chemins" label="Terrain" />

              <UsageCard value="3/semaine" label="Fréquence" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function UsageCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-3">
      <strong>{value}</strong>

      <p className="mt-1 text-xs text-neutral-600">{label}</p>
    </div>
  );
}
