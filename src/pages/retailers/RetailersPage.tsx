import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import { RetailerCard } from "../../components/retailers/RetailerCard";
import EmptyState from "../../components/ui/EmptyState";
import ErrorAlert from "../../components/ui/ErrorAlert";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { useRetails } from "../../hooks/useRetails";
import { MapPin } from "lucide-react";

export default function RetailersPage() {
  const { retails, isLoading, error } = useRetails();

  return (
    <PageShell mainClassName="space-y-5 p-5 pb-28">
      <SectionHeader
        title="Revendeurs partenaires"
        subtitle="Trouvez un point de vente près de chez vous"
        icon={<MapPin size={20} className="text-michelin-green" />}
      />

      {isLoading && <LoadingMessage />}
      {error && <ErrorAlert message={error} />}

      {!isLoading && !error && retails.length === 0 && (
        <EmptyState message="Aucun revendeur disponible pour le moment." />
      )}

      {retails.map((retail) => (
        <RetailerCard key={retail.id} retail={retail} />
      ))}
    </PageShell>
  );
}
