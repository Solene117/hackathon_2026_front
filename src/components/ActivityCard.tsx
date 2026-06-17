import { Flame } from "lucide-react";
import {
  formatActivityDate,
  formatKilometers,
  formatTerrain,
} from "../lib/format";
import type { Activity } from "../types/activity";

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const title = activity.name?.trim() || "Sortie vélo";

  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-neutral-300 p-5 last:mb-0">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
            <Flame size={13} />
          </span>
          <strong className="text-xl">{title}</strong>
        </div>

        <p className="mt-4 text-sm">{formatKilometers(activity.kilometers)}</p>
        {activity.status === "IN_PROGRESS" && (
          <p className="mt-1 text-xs font-semibold text-orange-600">En cours</p>
        )}
      </div>

      <div className="text-right">
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs">
          {formatTerrain(activity.terrainType)}
        </span>
        <p className="mt-4 text-sm">
          {formatActivityDate(activity.date, activity.startedAt)}
        </p>
      </div>
    </div>
  );
}
