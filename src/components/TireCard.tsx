import { Link } from "react-router-dom";

type TireCardProps = {
  name: string;
  status?: "Actif" | "Inactif";
  health: number;
};

export default function TireCard({
  name,
  status = "Actif",
  health,
}: TireCardProps) {
  return (
    <Link to="/suivi-pneu" className="block">
      <div className="rounded-xl border border-neutral-300 bg-white p-5 transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <strong className="text-xl">{name}</strong>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
            {status}
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span>État global</span>
          <strong>{health}%</strong>
        </div>

        <div className="mt-2 h-2 rounded-full bg-neutral-200">
          <div
            className="h-2 rounded-full bg-blue-700 transition-all"
            style={{ width: `${health}%` }}
          />
        </div>
      </div>
    </Link>
  );
}