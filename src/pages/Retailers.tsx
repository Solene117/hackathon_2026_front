import Header from "../components/Header";
import { RetailerCard } from "../components/RetailerCard";
import { useRetails } from "../hooks/useRetails";

export default function Retailers() {
  const { retails, isLoading, error } = useRetails();

  return (
    <div>
      <Header title="Voir les revendeurs" />

      <main className="space-y-5 p-5 pb-24">
        <h1 className="text-2xl font-bold">Revendeurs partenaires</h1>

        {isLoading && (
          <p className="text-sm text-neutral-600">Chargement...</p>
        )}

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && retails.length === 0 && (
          <p className="text-sm text-neutral-600">
            Aucun revendeur disponible pour le moment.
          </p>
        )}

        {retails.map((retail) => (
          <RetailerCard key={retail.id} retail={retail} />
        ))}
      </main>
    </div>
  );
}
