import { ChevronLeft, Bike, Zap, MapPin, Clock, Gauge } from "lucide-react";
import ActivityTireCard from "./ActivityTireCard";
import {
  formatDuration,
  formatKilometers,
  formatTerrain,
} from "../../lib/format";
import type { ActivityDetail, TerrainType } from "../../types/activity";

/* ── Palette terrain (même que ActivityCard) ── */
const TERRAIN_GRADIENT: Record<TerrainType, string> = {
  ASPHALT:     "from-[#1e3a6e] to-[#27509B]",
  HARD_PACKED: "from-[#8a5a1a] to-[#C9A227]",
  MIXED:       "from-[#4a7a00] to-[#84bd00]",
  GRAVEL:      "from-[#7a4800] to-[#d4721a]",
  ROCKY:       "from-[#2e3338] to-[#53565a]",
  MUD:         "from-[#3d2a00] to-[#7a5414]",
  SOFT:        "from-[#2d6e00] to-[#5aad00]",
  SAND:        "from-[#9a6b00] to-[#e8a820]",
  WET:         "from-[#1a4a8a] to-[#3a7bc8]",
  UNKNOWN:     "from-[#4a4e54] to-[#8C9BA5]",
};

function formatDateFull(date: string | null, startedAt: string | null): string {
  const value = date ?? startedAt;
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatSpeed(km: number | null, seconds: number | null): string {
  if (!km || !seconds || seconds === 0) return "—";
  const hours = seconds / 3600;
  return `${(km / hours).toFixed(1)} km/h`;
}

type StatItemProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  separator?: boolean;
};

function StatItem({ icon, value, label, separator = false }: StatItemProps) {
  return (
    <>
      {separator && <div className="w-px self-stretch bg-neutral-100" />}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-1 py-4">
        <span className="text-neutral-400">{icon}</span>
        <span className="text-xl font-black leading-tight text-neutral-900">{value}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </span>
      </div>
    </>
  );
}

type ActivityDetailViewProps = {
  activity: ActivityDetail;
  onBack: () => void;
};

export default function ActivityDetailView({
  activity,
  onBack,
}: ActivityDetailViewProps) {
  const title = activity.name?.trim() || "Sortie vélo";
  const gradient = TERRAIN_GRADIENT[activity.terrainType] ?? TERRAIN_GRADIENT.UNKNOWN;
  const isStrava = activity.source === "STRAVA";

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-app-bg">
      {/* Header */}
      <header className="flex items-center gap-3 bg-app-bg px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-neutral-700 transition hover:bg-neutral-100 active:scale-95"
          aria-label="Retour"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-base font-semibold text-neutral-800">Détail de la sortie</h1>
      </header>

      <main className="space-y-4 px-5 pb-10">

        {/* ── Hero card ── */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Zone gradient terrain */}
          <div className={`bg-linear-to-br ${gradient} px-5 pb-5 pt-5`}>
            {/* Ligne top : icône + badges */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Bike size={20} className="text-white" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {formatTerrain(activity.terrainType)}
                </span>
                {isStrava ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Zap size={11} /> Strava
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <MapPin size={11} /> Manuelle
                  </span>
                )}
              </div>
            </div>

            {/* Titre */}
            <h2 className="mt-3 text-2xl font-black leading-tight text-white">
              {title}
            </h2>

            {/* Date */}
            <p className="mt-1.5 text-sm font-medium capitalize text-white/70">
              {formatDateFull(activity.date, activity.startedAt)}
            </p>
          </div>

          {/* Zone stats */}
          <div className="flex divide-x divide-neutral-100">
            <StatItem
              icon={<MapPin size={15} />}
              value={formatKilometers(activity.kilometers)}
              label="Distance"
            />
            <StatItem
              separator
              icon={<Clock size={15} />}
              value={formatDuration(activity.durationSeconds)}
              label="Durée"
            />
            <StatItem
              separator
              icon={<Gauge size={15} />}
              value={formatSpeed(activity.kilometers, activity.durationSeconds)}
              label="Moy."
            />
          </div>
        </section>

        {/* ── Pneus associés ── */}
        <section>
          <h3 className="mb-3 px-0.5 text-base font-bold text-neutral-900">
            Pneus associés
            {activity.tires.length > 0 && (
              <span className="ml-2 text-sm font-normal text-neutral-400">
                ({activity.tires.length})
              </span>
            )}
          </h3>

          {activity.tires.length === 0 ? (
            <p className="rounded-2xl bg-white px-5 py-4 text-sm text-neutral-500 shadow-sm">
              Aucun pneu associé à cette sortie.
            </p>
          ) : (
            <div className="space-y-3">
              {activity.tires.map((tire) => (
                <ActivityTireCard key={tire.userTireId} tire={tire} />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
