import { Link } from "react-router-dom";

type TireCardProps = {
  userTireId?: number;
  name: string;
  status?: "Actif" | "Inactif";
  health: number;
};

function getHealthStyle(health: number) {
  if (health >= 70) {
    return {
      bar: "bg-michelin-green",
      text: "text-michelin-green",
      track: "bg-michelin-green/15",
    };
  }
  if (health >= 40) {
    return {
      bar: "bg-amber-400",
      text: "text-amber-500",
      track: "bg-amber-50",
    };
  }
  return {
    bar: "bg-red-500",
    text: "text-red-500",
    track: "bg-red-50",
  };
}

export default function TireCard({
  userTireId,
  name,
  status = "Actif",
  health,
}: TireCardProps) {
  const hs = getHealthStyle(health);

  const content = (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Ligne titre + badge */}
      <div className="flex items-start justify-between gap-3">
        <strong className="text-base font-bold text-neutral-900 leading-tight">{name}</strong>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Actif"
              ? "bg-michelin-green/10 text-michelin-green"
              : "bg-red-50 text-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* État + barre de progression */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">État global</span>
          <strong className={`text-lg font-bold ${hs.text}`}>{health}%</strong>
        </div>
        <div className={`h-2.5 w-full rounded-full ${hs.track}`}>
          <div
            className={`h-2.5 rounded-full transition-all duration-700 ${hs.bar}`}
            style={{ width: `${health}%` }}
          />
        </div>
      </div>
    </div>
  );

  if (!userTireId) return content;

  return (
    <Link to={`/suivi-pneu/${userTireId}`} className="block">
      {content}
    </Link>
  );
}
