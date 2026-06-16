import Header from "../components/Header";
import TireCard from "../components/TireCard";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-6 pb-24">
        <h1 className="mb-8 text-3xl font-bold">Bonjour Daniel</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4">
            <strong className="block text-2xl">300</strong>
            <span className="mt-2 block text-sm text-neutral-700">
              km parcourus
            </span>
          </div>

          <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4">
            <strong className="block text-2xl">10</strong>
            <span className="mt-2 block text-sm text-neutral-700">
              semaines consécutives
            </span>
          </div>
        </div>

        <section className="mt-8 rounded-xl border border-neutral-300 p-5">
          <h2 className="mb-4 text-2xl font-bold">Alertes</h2>

          <div className="rounded-xl border border-neutral-300 p-5">
            <strong className="text-xl">Michelin Power Gravel</strong>
            <p className="mt-3 text-sm">Crevaison lente</p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-neutral-300 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Activités récentes</h2>

            <Link
              to="/activites"
              className="text-sm font-semibold text-neutral-600 underline"
            >
              Voir plus
            </Link>
          </div>

          <ActivityCard type="Route" />
          <ActivityCard type="Gravel" />
        </section>

        <section className="mt-8 rounded-xl border border-neutral-300 p-5">
          <h2 className="mb-4 text-2xl font-bold">Pneus actifs</h2>

          <div className="space-y-4">
            <TireCard name="Michelin Power Gravel" health={72} />
            <TireCard name="Michelin Power Gravel" health={72} />
          </div>
        </section>
      </main>
    </div>
  );
}

function ActivityCard({ type }: { type: string }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-neutral-300 p-5 last:mb-0">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
            <Flame size={13} />
          </span>
          <strong className="text-xl">Annecy</strong>
        </div>

        <p className="mt-4 text-sm">80km</p>
      </div>

      <div className="text-right">
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs">
          {type}
        </span>
        <p className="mt-4 text-sm">15/06/26</p>
      </div>
    </div>
  );
}
