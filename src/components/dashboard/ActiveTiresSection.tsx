import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import EmptyState from "../ui/EmptyState";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import HorizontalSlider from "../ui/HorizontalSlider";
import { useUserTires } from "../../hooks/useUserTires";
import { selectActiveTires } from "../../stores/userTiresStore";
import type { UserTire } from "../../types/tire";
import { formatKilometers } from "../../lib/format";

const POSITION_LABELS: Record<string, string> = {
  FRONT: "Avant",
  REAR: "Arrière",
  SPARE: "Secours",
};

function getHealthConfig(health: number) {
  if (health >= 70) return { color: "#84bd00", label: "Bon état",  bg: "bg-michelin-green/10", text: "text-michelin-green" };
  if (health >= 40) return { color: "#f59e0b", label: "À surveiller", bg: "bg-amber-50",          text: "text-amber-500" };
  return              { color: "#ef4444", label: "À remplacer",    bg: "bg-red-50",            text: "text-red-500" };
}

/** Jauge circulaire SVG — exploite la circumference r=15.9 ≈ 100 */
function HealthGauge({ health }: { health: number }) {
  const { color } = getHealthConfig(health);
  const r = 15.9;
  const circ = 2 * Math.PI * r;
  const filled = (health / 100) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
        <circle
          cx="18" cy="18" r={r}
          fill="none" stroke="#e5e7eb" strokeWidth="3"
        />
        <circle
          cx="18" cy="18" r={r}
          fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
      </svg>
      <span
        className="absolute text-sm font-black leading-none"
        style={{ color }}
      >
        {health}%
      </span>
    </div>
  );
}

function TireDashCard({ tire }: { tire: UserTire }) {
  const { label, bg, text } = getHealthConfig(tire.health);
  const positionLabel = tire.position ? (POSITION_LABELS[tire.position] ?? tire.position) : null;

  return (
    <Link
      to={`/suivi-pneu/${tire.id}`}
      className="group flex w-[min(80vw,300px)] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
    >
      {/* Bande gauche colorée selon santé */}
      <div
        className="w-1 shrink-0 rounded-l-2xl transition-all duration-700"
        style={{ backgroundColor: getHealthConfig(tire.health).color }}
      />

      <div className="flex min-w-0 flex-1 items-center gap-4 px-4 py-4">
        {/* Jauge */}
        <div className="shrink-0">
          <HealthGauge health={tire.health} />
        </div>

        {/* Infos */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {positionLabel && (
              <span className="rounded-full bg-michelin-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-michelin-blue">
                {positionLabel}
              </span>
            )}
            {tire.smartTire && (
              <span className="rounded-full bg-michelin-blue-light-01 px-2 py-0.5 text-[10px] font-bold text-michelin-blue">
                Connecté
              </span>
            )}
          </div>

          <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
            {tire.model}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${bg} ${text}`}>
              {label}
            </span>
            {tire.kilometers != null && (
              <span className="text-[11px] font-medium text-neutral-400">
                {formatKilometers(tire.kilometers)}
              </span>
            )}
          </div>
        </div>

        <ChevronRight
          size={16}
          className="shrink-0 text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-400"
        />
      </div>
    </Link>
  );
}

export default function ActiveTiresSection() {
  const { tires, isLoading, error } = useUserTires();
  const activeTires = selectActiveTires(tires);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Pneus actifs</h2>
          {!isLoading && activeTires.length > 0 && (
            <p className="mt-0.5 text-sm text-neutral-500">
              {activeTires.length} pneu{activeTires.length > 1 ? "s" : ""} en service
            </p>
          )}
        </div>
        <Link
          to="/mes-pneus"
          className="flex items-center gap-0.5 text-sm font-semibold text-michelin-blue transition hover:text-michelin-blue-dark-03"
        >
          Voir tout <ChevronRight size={16} />
        </Link>
      </div>

      {isLoading && <LoadingMessage />}
      {error && <ErrorAlert message={error} className="mb-2" />}

      {!isLoading && !error && activeTires.length === 0 && (
        <EmptyState message="Aucun pneu actif pour le moment." />
      )}

      {!isLoading && !error && activeTires.length > 0 && (
        <HorizontalSlider
          showEdgeFade={false}
          showDots={activeTires.length > 1}
          gapClassName="gap-3"
          trackClassName="-mx-2 px-2"
        >
          {activeTires.map((tire) => (
            <TireDashCard key={tire.id} tire={tire} />
          ))}
        </HorizontalSlider>
      )}
    </section>
  );
}
