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
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-4">
        <strong className="block text-2xl">
          {isLoading ? "…" : Math.round(totalKm)}
        </strong>
        <span className="mt-2 block text-sm text-neutral-700">km parcourus</span>
      </div>

      <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-4">
        <strong className="block text-2xl">
          {isLoading ? "…" : activityCount}
        </strong>
        <span className="mt-2 block text-sm text-neutral-700">
          activités enregistrées
        </span>
      </div>
    </div>
  );
}
