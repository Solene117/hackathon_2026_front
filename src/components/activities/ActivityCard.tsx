import { useNavigate } from "react-router-dom";
import { Flame, Mountain, MapPin } from "lucide-react";
import {
  formatActivityDate,
  formatKilometers,
  formatTerrain,
} from "../../lib/format";
import type { Activity } from "../../types/activity";

type ActivityCardProps = {
  activity: Activity;
  variant?: "default" | "slide";
  className?: string;
};

const terrainIcons: Record<string, typeof Flame> = {
  MOUNTAIN: Mountain,
  URBAN: MapPin,
};

export default function ActivityCard({
  activity,
  variant = "default",
  className = "",
}: ActivityCardProps) {
  const navigate = useNavigate();
  const title = activity.name?.trim() || "Sortie vélo";
  const isInProgress =
    activity.status === "IN_PROGRESS" && activity.source === "APP_TRACKED";

  const TerrainIcon = terrainIcons[activity.terrainType ?? ""] ?? Flame;

  const baseClasses =
    "rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]";

  if (variant === "slide") {
    return (
      <button
        type="button"
        onClick={() => navigate(`/activites/${activity.id}`)}
        className={`${baseClasses} flex h-full w-[min(82vw,280px)] shrink-0 snap-start flex-col p-4 ${className}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-michelin-green/10">
            <TerrainIcon size={16} className="text-michelin-green" />
          </div>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
            {formatTerrain(activity.terrainType)}
          </span>
        </div>

        <strong className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-neutral-900">
          {title}
        </strong>

        {isInProgress && (
          <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-michelin-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-michelin-green" />
            En cours
          </span>
        )}

        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="text-2xl font-bold text-neutral-900">
            {formatKilometers(activity.kilometers)}
          </span>
          <span className="text-[11px] font-medium text-neutral-400">
            {formatActivityDate(activity.date, activity.startedAt)}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(`/activites/${activity.id}`)}
      className={`${baseClasses} w-full p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-michelin-green/10">
            <TerrainIcon size={18} className="text-michelin-green" />
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
        <span className="text-2xl font-bold text-neutral-900">
          {formatKilometers(activity.kilometers)}
        </span>
        <span className="text-xs font-medium text-neutral-400">
          {formatActivityDate(activity.date, activity.startedAt)}
        </span>
      </div>
    </button>
  );
}
