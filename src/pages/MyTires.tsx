import { Plus } from "lucide-react";
import Header from "../components/Header";
import TireCard from "../components/TireCard";

export default function MyTires() {
  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-5 pb-24">
        <h1 className="mb-2 text-2xl font-bold">Mes pneus</h1>
        <p className="mb-5 text-sm text-neutral-500">
          Sélectionnez un pneu pour consulter son état.
        </p>

        <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-800 px-4 py-3 font-semibold text-white shadow-sm hover:bg-neutral-600">
          <Plus size={18} />
          Ajouter un pneu
        </button>

        <div className="space-y-4">
          <TireCard name="Michelin Power Gravel" status="Actif" health={72} />
          <TireCard name="Michelin Power Gravel" status="Actif" health={72} />
          <TireCard name="Michelin Power Gravel" status="Inactif" health={72} />
        </div>
      </main>
    </div>
  );
}
