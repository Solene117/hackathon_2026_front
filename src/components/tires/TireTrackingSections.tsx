import { Info } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import StatCard from "../ui/StatCard";
import { formatKilometers } from "../../lib/format";
import type { UserTireInfo } from "../../types/tire";

type TireCurrentSectionProps = {
  smartTire?: boolean;
};

export function TireCurrentSection({
  smartTire = false,
}: TireCurrentSectionProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h1 className="text-2xl font-bold">Pneu actuel</h1>

      <div className="mt-4 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

      <h3 className="mt-4 text-xl font-bold">Michelin Power Gravel</h3>

      <p className="mt-1 text-sm text-neutral-700">Roue arrière</p>

      {smartTire && (
        <span className="mt-3 inline-block rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
          Pneu connecté
        </span>
      )}
    </section>
  );
}

type TireHealthSectionProps = {
  health: number;
  label: string;
  onShowRecommendation: () => void;
};

export function TireHealthSection({
  health,
  label,
  onShowRecommendation,
}: TireHealthSectionProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">État estimé</h2>

      <div className="mt-4 flex items-center justify-between">
        <strong className="text-3xl font-bold text-[#27509B]">{health}%</strong>

        <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
          {label}
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={health} />
      </div>

      <p className="mt-4 text-sm text-neutral-600">
        Estimé à partir de vos données d’usage et des données remontées.
      </p>

      <button
        type="button"
        onClick={onShowRecommendation}
        className="mt-5 w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white hover:bg-[#1a3d7a]"
      >
        Voir recommandation
      </button>
    </section>
  );
}

type TireUsageSectionProps = {
  tireInfo: UserTireInfo | null;
  isLoading?: boolean;
  error?: string | null;
  onShowTechnicalDetail: () => void;
};
  
function formatPressure(pressure: number | null): string {
  if (pressure == null) return "—";
  return `${pressure.toFixed(Number.isInteger(pressure) ? 0 : 1)} bars`;
}

export function TireUsageSection({
  tireInfo,
  isLoading = false,
  error = null,
  onShowTechnicalDetail,
}: TireUsageSectionProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">Données d’usage</h2>

      {isLoading && <p className="mt-4 text-sm text-neutral-600">Chargement...</p>}

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <>
          <div
            className={`mt-4 grid gap-3 ${
              tireInfo?.smartTire === true ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <StatCard
              variant="highlight"
              value={formatKilometers(tireInfo?.kilometers ?? null)}
              label="Distance"
            />
            {tireInfo?.smartTire === true && (
              <StatCard
                variant="highlight"
                value={formatPressure(tireInfo.lastPressureBar)}
                label="Pression"
              />
            )}
          </div>

          <button
            type="button"
            onClick={onShowTechnicalDetail}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#27509B] bg-white px-4 py-3 text-sm font-bold text-[#27509B] transition hover:bg-[#D4E7FA]/40"
          >
            <Info size={16} />
            Détails techniques
          </button>
        </>
      )}
    </section>
  );
}
