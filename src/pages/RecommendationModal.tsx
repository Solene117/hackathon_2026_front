import { Link } from "react-router-dom";

type RecommendationModalProps = {
  onClose: () => void;
};

export default function RecommendationModal({
  onClose,
}: RecommendationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[430px] px-5">
        <section className="rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold leading-tight">
              Remplacement recommandé
            </h1>

            <button
              onClick={onClose}
              className="text-xl font-bold text-neutral-500 hover:text-[#27509B]"
            >
              ✕
            </button>
          </div>

          <p className="mt-4 text-sm text-neutral-700">
            Votre pneu montre des signes d’usure plus rapides que prévu pour
            votre usage.
          </p>

          <h3 className="mt-5 font-bold">
            Pneu conseillé
          </h3>

          <div className="mt-3 flex h-32 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100">
            <span className="text-sm text-neutral-500">
              Image du pneu
            </span>
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Michelin Protek Cross
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            Optimisé pour les terrains mixtes avec une meilleure résistance aux
            crevaisons et une durée de vie prolongée.
          </p>

          <h4 className="mt-5 font-bold">
            Pourquoi ce choix ?
          </h4>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Durabilité</Chip>
            <Chip>Terrains mixtes</Chip>
            <Chip>Résistance renforcée</Chip>
          </div>

          <Link to="/retailers">
            <button className="mt-5 w-full rounded-lg bg-[#27509B] hover:bg-[#1a3d7a] px-4 py-3 text-sm font-bold text-white">
              Voir les revendeurs
            </button>
          </Link>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg border border-[#27509B] bg-white px-4 py-3 text-sm font-bold text-neutral-800 transition hover:bg-neutral-100"
          >
            Plus tard
          </button>
        </section>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#D4E7FA] px-3 py-2 text-xs font-medium text-[#27509B]">
      {children}
    </span>
  );
}