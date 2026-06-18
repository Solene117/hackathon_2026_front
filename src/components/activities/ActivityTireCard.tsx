import { Link } from "react-router-dom";
import { useUserTireInfo } from "../../hooks/useUserTireInfo";
import type { ActivityTireSummary } from "../../types/activity";

const POSITION_LABELS: Record<string, string> = {
  FRONT: "Roue avant",
  REAR: "Roue arrière",
  SPARE: "Roue de secours",
};

type ActivityTireCardProps = {
  tire: ActivityTireSummary;
};

export default function ActivityTireCard({ tire }: ActivityTireCardProps) {
  const { tireInfo } = useUserTireInfo(tire.userTireId);
  const positionLabel = tire.position
    ? (POSITION_LABELS[tire.position] ?? tire.position)
    : null;
  const productImage = normalizeImageUrl(tireInfo?.tireImage ?? tire.tireImage);

  return (
    <Link
      to={`/suivi-pneu/${tire.userTireId}`}
      className="block rounded-xl border border-neutral-300 bg-white transition hover:border-[#27509B] hover:shadow-md"
    >
      <div className="flex h-28 items-center justify-center rounded-t-xl border-b border-neutral-200 bg-neutral-100">
        <img
          src={productImage ?? undefined}
          alt={productImage ? `Pneu ${tire.name}` : ""}
          className={`h-full w-full object-contain p-3 ${
            productImage ? "" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-4">
        <strong className="text-lg">{tire.name}</strong>
        {positionLabel && (
          <p className="mt-1 text-sm text-neutral-600">{positionLabel}</p>
        )}
      </div>
    </Link>
  );
}

function normalizeImageUrl(imageUrl: string | null | undefined): string | null {
  const trimmedUrl = imageUrl?.trim();
  return trimmedUrl ? trimmedUrl : null;
}
