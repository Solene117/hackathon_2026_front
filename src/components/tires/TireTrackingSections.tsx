import { Info, Wifi, ChevronRight } from "lucide-react";
import StatCard from "../ui/StatCard";
import { formatKilometers } from "../../lib/format";
import type { UserTireInfo, UserTireWear } from "../../types/tire";

/* ─────────────────────────────────────────── helpers ──── */

const POSITION_LABELS: Record<string, string> = {
  FRONT: "Roue avant",
  REAR: "Roue arrière",
  SPARE: "Roue de secours",
};

const HEALTH_STATUS: Record<string, { label: string; color: string; bg: string; text: string }> = {
  good:         { label: "Bon état",          color: "#84bd00", bg: "bg-michelin-green/10", text: "text-michelin-green" },
  warning:      { label: "À surveiller",      color: "#f59e0b", bg: "bg-amber-50",          text: "text-amber-500"      },
  replace_soon: { label: "À remplacer bientôt", color: "#ef4444", bg: "bg-red-50",          text: "text-red-500"        },
};

function getHealthConfig(status: string | null, score: number | null) {
  if (status && HEALTH_STATUS[status]) return HEALTH_STATUS[status];
  if (score != null) {
    if (score >= 70) return HEALTH_STATUS.good;
    if (score >= 40) return HEALTH_STATUS.warning;
    return HEALTH_STATUS.replace_soon;
  }
  return { label: "Inconnu", color: "#8C9BA5", bg: "bg-neutral-100", text: "text-neutral-500" };
}

function formatTirePosition(position: string | null | undefined): string | null {
  if (!position) return null;
  return POSITION_LABELS[position] ?? position;
}

function formatPressure(pressure: number | null): string {
  if (pressure == null) return "—";
  return `${pressure.toFixed(Number.isInteger(pressure) ? 0 : 1)} bars`;
}

function clamp(value: number | null): number {
  if (value == null) return 0;
  return Math.min(100, Math.max(0, value));
}

/* ─────────────────────────────── semi-circular gauge ──── */

/**
 * Jauge semi-circulaire style compteur (arc du bas).
 * Arc : M (cx-r, cy) A r r 0 0 0 (cx+r, cy) — counter-clockwise = passe par le haut.
 * longueur de l'arc = π * r
 */
/**
 * Jauge semi-circulaire (type compteur) via stroke-dasharray sur un <circle>.
 *
 * Principe :
 *  - Circonférence complète = 2πr  (~502.65 pour r=80)
 *  - On masque la moitié inférieure avec strokeDasharray = "halfCirc halfCirc"
 *  - rotate(-180) positionne le début du trait à 9h (gauche)
 *  - Le fill parcourt la demi-circonférence proportionnellement au score
 */
function SemiGauge({ score, status }: { score: number | null; status: string | null }) {
  const value  = clamp(score);
  const { color, label, bg, text } = getHealthConfig(status, score);

  const r     = 80;
  const cx    = 100;
  const cy    = 100;
  const circ  = 2 * Math.PI * r;   // 502.65
  const half  = circ / 2;          // 251.33 — demi-tour = arc visible
  const fill  = (value / 100) * half;
  const rot   = `rotate(-180 ${cx} ${cy})`;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 10 200 105" className="w-full max-w-[260px]" aria-hidden>
        {/* Track gris — demi-cercle supérieur */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${half} ${half}`}
          transform={rot}
        />
        {/* Fill coloré */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`}
          transform={rot}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)" }}
        />
        {/* Pourcentage */}
        <text
          x={cx} y={cy - 12}
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fill={color}
          fontFamily="system-ui, sans-serif"
        >
          {score != null ? `${score}%` : "—"}
        </text>
        {/* Sous-libellé */}
        <text
          x={cx} y={cy + 6}
          textAnchor="middle"
          fontSize="9.5"
          fill="#a3a3a3"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          DURÉE DE VIE
        </text>
      </svg>

      <span className={`-mt-3 rounded-full px-3.5 py-1 text-xs font-semibold ${bg} ${text}`}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────── TireCurrentSection ──── */

type TireCurrentSectionProps = {
  model?: string | null;
  position?: string | null;
  tireImage?: string | null;
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
  tireImage,
  smartTire = false,
  isActive = null,
  isActiveLoading = false,
  activeError = null,
  onToggleActive,
  isLoading = false,
  error = null,
}: TireCurrentSectionProps) {
  const positionLabel = formatTirePosition(position);
  const productImage = tireImage?.trim() || null;
  const activeLabel = isActive === null ? "Indisponible" : isActive ? "Actif" : "Inactif";

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Zone image avec fond dégradé Michelin */}
      <div className="relative bg-linear-to-br from-michelin-blue-light-01/70 via-michelin-blue-light-02/30 to-white px-6 pb-5 pt-5">
        {/* Toggle actif — coin haut droit */}
        {onToggleActive && (
          <div className="absolute right-4 top-4">
            <button
              type="button"
              role="switch"
              aria-checked={isActive === true}
              aria-label={isActive ? "Passer le pneu en inactif" : "Passer le pneu en actif"}
              onClick={onToggleActive}
              disabled={isActiveLoading || isActive === null}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isActive
                  ? "border-michelin-green/30 bg-white text-michelin-green"
                  : "border-neutral-200 bg-white text-neutral-500"
              }`}
            >
              <span
                className={`relative h-4 w-7 rounded-full transition ${
                  isActive ? "bg-michelin-green" : "bg-neutral-300"
                }`}
                aria-hidden
              >
                <span
                  className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all ${
                    isActive ? "left-3.5" : "left-0.5"
                  }`}
                />
              </span>
              <span>{isActiveLoading ? "…" : activeLabel}</span>
            </button>
          </div>
        )}

        {/* Image pneu */}
        <div className="flex justify-center py-2">
          <img
            src={productImage ?? undefined}
            alt={productImage ? (model ?? "Pneu") : ""}
            className={`h-44 w-44 object-contain transition-opacity duration-300 ${
              productImage ? "opacity-100 drop-shadow-lg" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Infos bas de card */}
      <div className="px-5 pb-5 pt-4">
        <h1 className="text-xl font-black leading-tight text-neutral-900">
          {isLoading ? "Chargement…" : (model ?? "—")}
        </h1>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {positionLabel && (
            <span className="rounded-full bg-michelin-blue/10 px-2.5 py-1 text-xs font-bold text-michelin-blue">
              {positionLabel}
            </span>
          )}
          {smartTire && (
            <span className="inline-flex items-center gap-1 rounded-full bg-michelin-blue-light-01 px-2.5 py-1 text-xs font-semibold text-michelin-blue">
              <Wifi size={11} /> Pneu connecté
            </span>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>
        )}
        {activeError && (
          <p className="mt-2 text-sm text-red-600" role="alert">{activeError}</p>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────── TireHealthSection ──── */

type TireHealthSectionProps = {
  healthScore: number | null;
  healthStatus: UserTireWear["healthStatus"];
  isLoading?: boolean;
  error?: string | null;
};

export function TireHealthSection({
  healthScore,
  healthStatus,
  isLoading = false,
  error = null,
}: TireHealthSectionProps) {
  return (
    <section className="rounded-2xl bg-white px-5 py-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-neutral-500 uppercase tracking-wider">
        Santé du pneu
      </h2>

      {isLoading ? (
        <p className="py-4 text-center text-sm text-neutral-400">Chargement…</p>
      ) : (
        <>
          <div className="flex justify-center">
            <SemiGauge score={healthScore} status={healthStatus ?? null} />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
          )}

          <p className="mt-4 text-center text-xs text-neutral-400">
            Estimée à partir de vos données d'usage et des données remontées.
          </p>
        </>
      )}
    </section>
  );
}

/* ─────────────────────────── TireUsageSection ──── */

type TireUsageSectionProps = {
  tireInfo: UserTireInfo | null;
  isLoading?: boolean;
  error?: string | null;
  onShowTechnicalDetail: () => void;
};

export function TireUsageSection({
  tireInfo,
  isLoading = false,
  error = null,
  onShowTechnicalDetail,
}: TireUsageSectionProps) {
  const isSmartTire = tireInfo?.smartTire === true;

  return (
    <section className="rounded-2xl bg-white px-5 py-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold uppercase tracking-wider text-neutral-500">
          Données d'usage
        </h2>
        <button
          type="button"
          onClick={onShowTechnicalDetail}
          className="flex items-center gap-1 text-xs font-semibold text-michelin-blue transition hover:text-michelin-blue-dark-03"
        >
          <Info size={13} /> Détails techniques <ChevronRight size={13} />
        </button>
      </div>

      {isLoading && (
        <p className="py-2 text-sm text-neutral-400">Chargement…</p>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}

      {!isLoading && !error && (
        <div className={`grid gap-3 ${isSmartTire ? "grid-cols-2" : "grid-cols-1"}`}>
          <StatCard
            variant="highlight"
            value={formatKilometers(tireInfo?.kilometers ?? null)}
            label="Distance parcourue"
          />
          {isSmartTire && (
            <StatCard
              accent="blue"
              value={formatPressure(tireInfo?.lastPressureBar ?? null)}
              label="Pression actuelle"
            />
          )}
        </div>
      )}
    </section>
  );
}
