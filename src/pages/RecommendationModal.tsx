import { Link } from "react-router-dom";

export default function RecommendationModal() {
  return (
    <div>
      <section className="w-full rounded-xl border border-neutral-300 bg-white p-5 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold leading-tight">
            Remplacement recommandé
          </h1>

          <Link to="/suivi-pneu" className="text-xl font-bold">
            X
          </Link>
        </div>

        <p className="mt-4 text-sm text-neutral-700">
          Votre pneu montre des signes d’usure plus rapides que prévu pour votre
          usage.
        </p>

        <h3 className="mt-5 font-bold">Pneu conseillé</h3>

        <div className="mt-3 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

        <h2 className="mt-4 text-xl font-bold">Michelin Protek Cross</h2>

        <h4 className="mt-4 font-bold">Pourquoi ce choix ?</h4>

        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>Durabilité</Chip>
          <Chip>Terrains mixtes</Chip>
          <Chip>Résistance renforcée</Chip>
        </div>

        <Link to="/retailers">
          <button className="mt-5 w-full rounded-lg bg-neutral-800 px-4 py-3 text-sm font-bold text-white">
            Voir les revendeurs
          </button>
        </Link>

        <Link to="/suivi-pneu">
          <button className="mt-3 w-full rounded-lg border border-neutral-800 bg-white px-4 py-3 text-sm font-bold text-neutral-800">
            Plus tard
          </button>
        </Link>
      </section>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs">
      {children}
    </span>
  );
}
