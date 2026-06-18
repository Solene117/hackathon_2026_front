import { Plus } from "lucide-react";
import PageShell from "../../components/layout/PageShell";
import TireCard from "../../components/tires/TireCard";
import EmptyState from "../../components/ui/EmptyState";
import ErrorAlert from "../../components/ui/ErrorAlert";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { useUserTires } from "../../hooks/useUserTires";

export default function MyTiresPage() {
  const { tires, isLoading, error } = useUserTires();

  return (
    <PageShell title="MICHELIN Ride Companion">
      <h1 className="mb-2 text-2xl font-bold">Mes pneus</h1>
      <p className="mb-5 text-sm text-neutral-500">
        Sélectionnez un pneu pour consulter son état.
      </p>

      <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 font-semibold text-white shadow-sm hover:bg-[#00205B]">
        <Plus size={18} />
        Ajouter un pneu
      </button>

      {isLoading && <LoadingMessage />}

      {error && <ErrorAlert message={error} />}

      {!isLoading && !error && tires.length === 0 && (
        <EmptyState message="Aucun pneu enregistré pour le moment." />
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
    </PageShell>
  );
}
