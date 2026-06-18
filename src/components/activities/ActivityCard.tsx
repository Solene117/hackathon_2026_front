import { useNavigate } from "react-router-dom";
import { Bike, Clock, Zap } from "lucide-react";
import {
  formatActivityDate,
  formatDuration,
  formatKilometers,
  formatTerrain,
} from "../../lib/format";
import type { Activity, TerrainType } from "../../types/activity";

type ActivityCardProps = {
  activity: Activity;
  variant?: "default" | "slide";
  className?: string;
};

/** Palette couleur par terrain — accent card */
const TERRAIN_PALETTE: Record<TerrainType, { bg: string; text: string; badge: string }> = {
  ASPHALT:     { bg: "from-[#1e3a6e] to-[#27509B]",    text: "text-white",        badge: "bg-white/15 text-white" },
  HARD_PACKED: { bg: "from-[#8a5a1a] to-[#C9A227]",    text: "text-white",        badge: "bg-white/15 text-white" },
  MIXED:       { bg: "from-[#4a7a00] to-[#84bd00]",    text: "text-white",        badge: "bg-white/15 text-white" },
  GRAVEL:      { bg: "from-[#7a4800] to-[#d4721a]",    text: "text-white",        badge: "bg-white/15 text-white" },
  ROCKY:       { bg: "from-[#2e3338] to-[#53565a]",    text: "text-white",        badge: "bg-white/15 text-white" },
  MUD:         { bg: "from-[#3d2a00] to-[#7a5414]",    text: "text-white",        badge: "bg-white/15 text-white" },
  SOFT:        { bg: "from-[#2d6e00] to-[#5aad00]",    text: "text-white",        badge: "bg-white/15 text-white" },
  SAND:        { bg: "from-[#9a6b00] to-[#e8a820]",    text: "text-white",        badge: "bg-white/15 text-white" },
  WET:         { bg: "from-[#1a4a8a] to-[#3a7bc8]",    text: "text-white",        badge: "bg-white/15 text-white" },
  UNKNOWN:     { bg: "from-[#4a4e54] to-[#8C9BA5]",    text: "text-white",        badge: "bg-white/15 text-white" },
};

function getTerrainPalette(terrain: TerrainType) {
  return TERRAIN_PALETTE[terrain] ?? TERRAIN_PALETTE.UNKNOWN;
}

export default function ActivityCard({
  activity,
  variant = "default",
  className = "",
}: ActivityCardProps) {
  const navigate = useNavigate();
  const title = activity.name?.trim() || "Sortie vélo";
  const isInProgress =
    activity.status === "IN_PROGRESS" && activity.source === "APP_TRACKED";
  const palette = getTerrainPalette(activity.terrainType);

  if (variant === "slide") {
    return (
      <button
        type="button"
        onClick={() => navigate(`/activites/${activity.id}`)}
        className={`group w-[min(78vw,240px)] shrink-0 snap-start overflow-hidden rounded-2xl text-left shadow-md transition-all duration-200 active:scale-[0.97] hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      >
        {/* Header coloré */}
        <div className={`bg-linear-to-br ${palette.bg} px-4 pb-3 pt-4`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <Bike size={15} className="text-white" />
            </div>
            {isInProgress ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                En cours
              </span>
            ) : (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${palette.badge}`}>
                {formatTerrain(activity.terrainType)}
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-white">
            {title}
          </p>
        </div>

        {/* Footer stats */}
        <div className="bg-white px-4 pb-3.5 pt-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Distance
              </span>
              <span className="text-2xl font-black leading-tight text-neutral-900">
                {formatKilometers(activity.kilometers)}
              </span>
            </div>

            <div className="text-right">
              {activity.durationSeconds != null && (
                <span className="mb-0.5 flex items-center justify-end gap-1 text-[11px] font-semibold text-neutral-500">
                  <Clock size={11} />
                  {formatDuration(activity.durationSeconds)}
                </span>
              )}
              <span className="text-[11px] font-medium text-neutral-400">
                {formatActivityDate(activity.date, activity.startedAt)}
              </span>
            </div>
          </div>

          {activity.source === "STRAVA" && (
            <div className="mt-2 flex items-center gap-1">
              <Zap size={10} className="text-[#FC4C02]" />
              <span className="text-[10px] font-semibold text-[#FC4C02]">Strava</span>
            </div>
          )}
        </div>
      </button>
    );
  }

  /* ── Variante default (liste) ── */
  return (
    <button
      type="button"
      onClick={() => navigate(`/activites/${activity.id}`)}
      className={`w-full overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${className}`}
    >
      {/* Bandeau accent terrain */}
      <div className={`h-1.5 bg-linear-to-r ${palette.bg}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${palette.bg}`}>
              <Bike size={18} className="text-white" />
            </div>
            <div>
              <strong className="block font-bold leading-snug text-neutral-900">
                {title}
              </strong>
              {isInProgress && (
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-semibold text-michelin-green">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-michelin-green" />
                  En cours
                </span>
              )}
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
            {formatTerrain(activity.terrainType)}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">
              {formatKilometers(activity.kilometers)}
            </span>
            {activity.durationSeconds != null && (
              <span className="ml-2 text-sm font-medium text-neutral-500">
                · {formatDuration(activity.durationSeconds)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-neutral-400">
            {formatActivityDate(activity.date, activity.startedAt)}
          </span>
        </div>
      </div>
    </button>
  );
}
