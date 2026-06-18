import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
      className="group flex overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
    >
      {/* Bande accent gauche */}
      <div className="w-1 shrink-0 bg-michelin-blue" />

      {/* Image pneu */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-michelin-blue-light-01/30 p-2">
        <img
          src={productImage ?? undefined}
          alt={productImage ? `Pneu ${tire.name}` : ""}
          className={`h-full w-full object-contain transition-opacity duration-200 ${
            productImage ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Infos */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-3">
        {positionLabel && (
          <span className="w-fit rounded-full bg-michelin-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-michelin-blue">
            {positionLabel}
          </span>
        )}
        <strong className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
          {tire.name}
        </strong>
      </div>

      {/* Chevron */}
      <div className="flex items-center pr-4">
        <ChevronRight
          size={16}
          className="text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-400"
        />
      </div>
    </Link>
  );
}

function normalizeImageUrl(imageUrl: string | null | undefined): string | null {
  const trimmedUrl = imageUrl?.trim();
  return trimmedUrl ? trimmedUrl : null;
}
