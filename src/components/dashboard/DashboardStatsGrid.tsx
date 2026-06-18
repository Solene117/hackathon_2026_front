import { RouteIcon, Activity } from "lucide-react";

type DashboardStatsGridProps = {
  totalKm: number;
  activityCount: number;
  isLoading: boolean;
};

export default function DashboardStatsGrid({
  totalKm,
  activityCount,
  isLoading,
}: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Km parcourus — accent vert */}
      <div className="rounded-2xl border border-michelin-green/20 bg-michelin-green/8 p-4">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-michelin-green/15">
          <RouteIcon size={16} className="text-michelin-green" />
        </div>
        <p className="text-2xl font-bold text-michelin-green">
          {isLoading ? "…" : Math.round(totalKm)}
        </p>
        <p className="mt-1 text-xs font-medium text-neutral-500">km parcourus</p>
      </div>

      {/* Activités — accent bleu */}
      <div className="rounded-2xl border border-michelin-blue/20 bg-michelin-blue/8 p-4">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-michelin-blue/15">
          <Activity size={16} className="text-michelin-blue" />
        </div>
        <p className="text-2xl font-bold text-michelin-blue">
          {isLoading ? "…" : activityCount}
        </p>
        <p className="mt-1 text-xs font-medium text-neutral-500">activités enregistrées</p>
      </div>
    </div>
  );
}
