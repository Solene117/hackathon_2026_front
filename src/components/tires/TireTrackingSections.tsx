import { Info } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import StatCard from "../ui/StatCard";
import { formatKilometers } from "../../lib/format";
import type { UserTireInfo, UserTireWear } from "../../types/tire";

type TireCurrentSectionProps = {
  model?: string | null;
  position?: string | null;
  smartTire?: boolean;
  isActive?: boolean | null;
  isActiveLoading?: boolean;
  activeError?: string | null;
  onToggleActive?: () => void;
  isLoading?: boolean;
  error?: string | null;
};

export function TireCurrentSection({
  model,
  position,
  smartTire = false,
  isActive = null,
  isActiveLoading = false,
  activeError = null,
  onToggleActive,
  isLoading = false,
  error = null,
}: TireCurrentSectionProps) {
  const positionLabel = formatTirePosition(position);
  const activeLabel =
    isActive === null ? "Indisponible" : isActive ? "Actif" : "Inactif";

  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold">Pneu actuel</h1>

        {onToggleActive && (
          <button
            type="button"
            role="switch"
            aria-checked={isActive === true}
            aria-label={
              isActive ? "Passer le pneu en inactif" : "Passer le pneu en actif"
            }
            onClick={onToggleActive}
            disabled={isActiveLoading || isActive === null}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive
                ? "border-michelin-green/30 bg-michelin-green/10 text-michelin-green"
                : "border-neutral-200 bg-neutral-100 text-neutral-500"
            }`}
          >
            <span
              className={`relative h-4 w-7 rounded-full transition ${
                isActive ? "bg-michelin-green" : "bg-neutral-300"
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition ${
                  isActive ? "left-3.5" : "left-0.5"
                }`}
              />
            </span>
            <span>{isActiveLoading ? "..." : activeLabel}</span>
          </button>
        )}
      </div>

      <div className="mt-4 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

      <h3 className="mt-4 text-xl font-bold">
        {isLoading ? "Chargement..." : (model ?? "—")}
      </h3>

      {positionLabel && (
        <p className="mt-1 text-sm text-neutral-700">{positionLabel}</p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {activeError && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {activeError}
        </p>
      )}

      {smartTire && (
        <span className="mt-3 inline-block rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
          Pneu connecté
        </span>
      )}
    </section>
  );
}

type TireHealthSectionProps = {
  healthScore: number | null;
  healthStatus: UserTireWear["healthStatus"];
  isLoading?: boolean;
  error?: string | null;
  onShowRecommendation: () => void;
};

export function TireHealthSection({
  healthScore,
  healthStatus,
  isLoading = false,
  error = null,
  onShowRecommendation,
}: TireHealthSectionProps) {
  const progressValue = clampProgressValue(healthScore);

  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">Usure estimée</h2>

      <div className="mt-4 flex items-center justify-between">
        <strong className="text-3xl font-bold text-[#27509B]">
          {isLoading ? "..." : formatWearScore(healthScore)}
        </strong>

        <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
          {formatHealthStatus(healthStatus)}
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={progressValue} showValue={false} />
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <p className="mt-4 text-sm text-neutral-600">
        Estimée à partir de vos données d’usage et des données remontées.
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

const POSITION_LABELS: Record<string, string> = {
  FRONT: "Roue avant",
  REAR: "Roue arrière",
  SPARE: "Roue de secours",
};

const HEALTH_STATUS_LABELS: Record<string, string> = {
  good: "Bon état",
  warning: "À surveiller",
  replace_soon: "À remplacer bientôt",
};

function formatTirePosition(position: string | null | undefined): string | null {
  if (!position) return null;
  return POSITION_LABELS[position] ?? position;
}

function formatHealthStatus(status: UserTireWear["healthStatus"]): string {
  if (!status) return "—";
  return HEALTH_STATUS_LABELS[status] ?? status;
}

function formatWearScore(score: number | null): string {
  if (score == null) return "—";
  return `${score}%`;
}

function clampProgressValue(value: number | null): number {
  if (value == null) return 0;
  return Math.min(100, Math.max(0, value));
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
