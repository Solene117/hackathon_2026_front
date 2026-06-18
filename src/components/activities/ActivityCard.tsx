import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import {
  formatActivityDate,
  formatKilometers,
  formatTerrain,
} from "../../lib/format";
import type { Activity } from "../../types/activity";

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const navigate = useNavigate();
  const title = activity.name?.trim() || "Sortie vélo";
  const isInProgress =
    activity.status === "IN_PROGRESS" && activity.source === "APP_TRACKED";

  return (
    <button
      type="button"
      onClick={() => navigate(`/activites/${activity.id}`)}
      className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-300 p-5 text-left transition last:mb-0 hover:border-[#27509B] hover:bg-neutral-50"
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#27509B] text-white">
            <Flame size={13} />
          </span>
          <strong className="text-xl">{title}</strong>
        </div>

        <p className="mt-4 text-sm">{formatKilometers(activity.kilometers)}</p>
        {isInProgress && (
          <p className="mt-1 text-xs font-semibold text-[#27509B]">En cours</p>
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
    </button>
  );
}
