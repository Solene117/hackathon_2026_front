import { ChevronLeft, Flame } from "lucide-react";
import ActivityTireCard from "./ActivityTireCard";
import StatCard from "../ui/StatCard";
import {
  formatActivityDate,
  formatDuration,
  formatKilometers,
  formatTerrain,
} from "../../lib/format";
import type { ActivityDetail } from "../../types/activity";

type ActivityDetailViewProps = {
  activity: ActivityDetail;
  onBack: () => void;
};

export default function ActivityDetailView({
  activity,
  onBack,
}: ActivityDetailViewProps) {
  const title = activity.name?.trim() || "Sortie vélo";

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white">
      <header className="flex items-center gap-3 border-b border-neutral-200 px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
          aria-label="Retour"
        >
          <ChevronLeft size={28} />
        </button>

        <h1 className="text-lg font-semibold">Détail de la sortie</h1>
      </header>

      <main className="space-y-6 p-5 pb-10">
        <section className="rounded-xl border border-neutral-300 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27509B] text-white">
              <Flame size={14} />
            </span>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium">
              {formatTerrain(activity.terrainType)}
            </span>
            <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium">
              {activity.source === "STRAVA" ? "Strava" : "Manuelle"}
            </span>
          </div>

          <p className="mt-4 text-sm text-neutral-600">
            {formatActivityDate(activity.date, activity.startedAt)}
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-bold">Statistiques</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Distance"
              value={formatKilometers(activity.kilometers)}
            />
            <StatCard
              label="Durée"
              value={formatDuration(activity.durationSeconds)}
            />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-bold">Pneus associés</h3>

          {activity.tires.length === 0 ? (
            <p className="rounded-xl border border-neutral-300 p-5 text-sm text-neutral-600">
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
