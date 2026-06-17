import { Plus } from "lucide-react";
import Header from "../components/Header";
import TireCard from "../components/TireCard";
import { useUserTires } from "../hooks/useUserTires";

export default function MyTires() {
  const { tires, isLoading, error } = useUserTires();

  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-5 pb-24">
        <h1 className="mb-2 text-2xl font-bold">Mes pneus</h1>
        <p className="mb-5 text-sm text-neutral-500">
          Sélectionnez un pneu pour consulter son état.
        </p>

        <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 font-semibold text-white shadow-sm hover:bg-[#00205B]">
          <Plus size={18} />
          Ajouter un pneu
        </button>

        {isLoading && (
          <p className="text-sm text-neutral-600">Chargement...</p>
        )}

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && tires.length === 0 && (
          <p className="text-sm text-neutral-600">
            Aucun pneu enregistré pour le moment.
          </p>
        )}

        <div className="space-y-4">
          {tires.map((tire) => (
            <TireCard
              key={tire.id}
              userTireId={tire.id}
              name={tire.model}
              status={tire.isActive ? "Actif" : "Inactif"}
              health={tire.health}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
