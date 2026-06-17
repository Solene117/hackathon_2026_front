import { Link } from "react-router-dom";
import MichelinProgressBar from "./ProgressBar";

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

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "Actif"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span>État global</span>
          <strong className="text-xl font-bold text-[#27509B]">
            {health}%
          </strong>
        </div>

        <div className="mt-4">
          <MichelinProgressBar value={health} />
        </div>
      </div>
    </Link>
  );
}
