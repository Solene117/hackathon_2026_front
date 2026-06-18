import ProgressBar from "../ui/ProgressBar";
import StatCard from "../ui/StatCard";

export function TireCurrentSection() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h1 className="text-2xl font-bold">Pneu actuel</h1>

      <div className="mt-4 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

      <h3 className="mt-4 text-xl font-bold">Michelin Power Gravel</h3>

      <p className="mt-1 text-sm text-neutral-700">Roue arrière</p>

      <span className="mt-3 inline-block rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
        Valve connectée active
      </span>
    </section>
  );
}

type TireHealthSectionProps = {
  health: number;
  label: string;
  onShowRecommendation: () => void;
};

export function TireHealthSection({
  health,
  label,
  onShowRecommendation,
}: TireHealthSectionProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">État estimé</h2>

      <div className="mt-4 flex items-center justify-between">
        <strong className="text-3xl font-bold text-[#27509B]">{health}%</strong>

        <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
          {label}
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={health} />
      </div>

      <p className="mt-4 text-sm text-neutral-600">
        Estimé à partir de vos données d’usage et des données remontées.
      </p>

      <button
        type="button"
        onClick={onShowRecommendation}
        className="mt-5 w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white hover:bg-[#1a3d7a]"
      >
        Voir recommandation
      </button>
    </section>
  );
}

export function TireUsageSection() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">Données d’usage</h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatCard variant="highlight" value="840 km" label="Distance" />
        <StatCard variant="highlight" value="4.2 bars" label="Pression" />
        <StatCard variant="highlight" value="Chemins" label="Terrain" />
        <StatCard variant="highlight" value="3/semaine" label="Fréquence" />
      </div>
    </section>
  );
}
