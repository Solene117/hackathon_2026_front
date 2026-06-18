import PageShell from "../../components/layout/PageShell";
import { RetailerCard } from "../../components/retailers/RetailerCard";
import EmptyState from "../../components/ui/EmptyState";
import ErrorAlert from "../../components/ui/ErrorAlert";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { useRetails } from "../../hooks/useRetails";

export default function RetailersPage() {
  const { retails, isLoading, error } = useRetails();

  return (
    <PageShell title="Voir les revendeurs" mainClassName="space-y-5 p-5 pb-24">
      <h1 className="text-2xl font-bold">Revendeurs partenaires</h1>

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
