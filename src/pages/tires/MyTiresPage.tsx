import { useState } from "react";
import { Plus } from "lucide-react";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import AddTireModal from "../../components/tires/AddTireModal";
import TireCard from "../../components/tires/TireCard";
import EmptyState from "../../components/ui/EmptyState";
import ErrorAlert from "../../components/ui/ErrorAlert";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { useUserTires } from "../../hooks/useUserTires";
import bicycleWheelIcon from "../../assets/bicycle_wheel.svg";

export default function MyTiresPage() {
  const { tires, isLoading, error, refresh } = useUserTires();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      {showAddModal && (
        <AddTireModal
          onClose={() => setShowAddModal(false)}
          onAdded={() => void refresh()}
        />
      )}
    <PageShell mainClassName="p-5 pb-28">
      <SectionHeader
        title="Mes pneus"
        subtitle="Sélectionnez un pneu pour consulter son état"
        icon={
          <img
            src={bicycleWheelIcon}
            alt=""
            aria-hidden
            className="h-5 w-5"
            style={{ filter: "brightness(0) saturate(100%) invert(54%) sepia(97%) saturate(401%) hue-rotate(47deg)" }}
          />
        }
      />

      {/* Bouton Ajouter */}
      <button
        type="button"
        onClick={() => setShowAddModal(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-full bg-michelin-green px-4 py-3 font-semibold text-white shadow-sm shadow-green-200/60 transition hover:opacity-90 active:scale-[0.98]"
      >
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
    </>
  );
}
