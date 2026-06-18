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
};

const terrainIcons: Record<string, typeof Flame> = {
  MOUNTAIN: Mountain,
  URBAN: MapPin,
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const navigate = useNavigate();
  const title = activity.name?.trim() || "Sortie vélo";
  const isInProgress =
    activity.status === "IN_PROGRESS" && activity.source === "APP_TRACKED";

  const TerrainIcon =
    terrainIcons[activity.terrainType ?? ""] ?? Flame;

  return (
    <button
      type="button"
      onClick={() => navigate(`/activites/${activity.id}`)}
      className="w-full rounded-2xl border border-neutral-100 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Icône + titre */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-michelin-green/10">
            <TerrainIcon size={18} className="text-michelin-green" />
          </div>
          <div>
            <strong className="block font-bold text-neutral-900 leading-snug">{title}</strong>
            {isInProgress && (
              <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-semibold text-michelin-green">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-michelin-green" />
                En cours
              </span>
            )}
          </div>
        </div>

        {/* Badge terrain */}
        <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
          {formatTerrain(activity.terrainType)}
        </span>
      </div>

      {/* Distance + date */}
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
