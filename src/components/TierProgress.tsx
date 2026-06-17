import { computeTierProgress } from "../lib/loyalty";

type TierProgressProps = {
  points: number;
};

export default function TierProgress({ points }: TierProgressProps) {
  const { current, next, progressPercent, pointsToNext } =
    computeTierProgress(points);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-neutral-600">
        <span style={{ color: current.color }}>{current.label}</span>
        {next ? (
          <span style={{ color: next.color }}>{next.label}</span>
        ) : (
          <span className="text-[#27509B]">Palier maximum</span>
        )}
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: next ? next.color : "#27509B",
          }}
        />
      </div>

      <p className="mt-2 text-xs text-neutral-600">
        {next ? (
          <>
            Plus que{" "}
            <strong className="text-neutral-900">{pointsToNext} pts</strong>{" "}
            pour atteindre le palier {next.label}.
          </>
        ) : (
          <>Vous profitez du palier le plus élevé. Bravo&nbsp;!</>
        )}
      </p>
    </div>
  );
}
