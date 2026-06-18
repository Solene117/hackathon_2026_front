import TireCard from "../tires/TireCard";
import EmptyState from "../ui/EmptyState";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import { useUserTires } from "../../hooks/useUserTires";
import { selectActiveTires } from "../../stores/userTiresStore";

export default function ActiveTiresSection() {
  const { tires, isLoading, error } = useUserTires();
  const activeTires = selectActiveTires(tires);

  return (
    <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-neutral-900">Pneus actifs</h2>

      {isLoading && <LoadingMessage />}

      {error && <ErrorAlert message={error} className="mb-4" />}

      {!isLoading && !error && activeTires.length === 0 && (
        <EmptyState message="Aucun pneu actif pour le moment." />
      )}

      <div className="space-y-4">
        {activeTires.map((tire) => (
          <TireCard
            key={tire.id}
            userTireId={tire.id}
            name={tire.model}
            status="Actif"
            health={tire.health}
          />
        ))}
      </div>
    </section>
  );
}
