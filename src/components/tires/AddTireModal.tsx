import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchTireCatalog, addUserTire } from "../../api/tires";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import type { TireCatalogItem } from "../../types/tire";
import { getApiErrorMessage } from "../../lib/errors";

type AddTireModalProps = {
  onClose: () => void;
  onAdded: () => void;
};

export default function AddTireModal({ onClose, onAdded }: AddTireModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TireCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingTireId, setAddingTireId] = useState<number | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  async function handleAdd(tireId: number) {
    setAddError(null);
    setAddingTireId(tireId);

    try {
      await addUserTire(tireId);
      onAdded();
      onClose();
    } catch (err) {
      setAddError(getApiErrorMessage(err));
    } finally {
      setAddingTireId(null);
    }
  }

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      void searchTireCatalog(trimmedQuery)
        .then((items) => {
          setResults(items);
        })
        .catch((err) => {
          setError(getApiErrorMessage(err));
          setResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-[430px] px-5 pb-5 sm:pb-0">
        <section className="max-h-[85vh] overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl">
          <div className="border-b border-neutral-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Ajouter un pneu</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Recherchez un modèle dans le catalogue Michelin.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-xl font-bold text-neutral-500 hover:text-[#27509B]"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="relative mt-4">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un pneu..."
                autoFocus
                className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] py-3 pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-5">
            {!query.trim() && (
              <p className="text-sm text-neutral-500">
                Saisissez un nom de pneu pour lancer la recherche.
              </p>
            )}

            {query.trim() && isLoading && <LoadingMessage />}

            {query.trim() && error && <ErrorAlert message={error} />}

            {addError && <ErrorAlert message={addError} />}

            {query.trim() && !isLoading && !error && results.length === 0 && (
              <p className="text-sm text-neutral-500">
                Aucun pneu trouvé pour cette recherche.
              </p>
            )}

            <ul className="space-y-3">
              {results.map((tire) => (
                <li key={tire.id}>
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100">
                        <span className="px-1 text-center text-[10px] leading-tight text-neutral-500">
                          Image du pneu
                        </span>
                      </div>

                      <span className="font-semibold text-neutral-900">
                        {tire.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleAdd(tire.id)}
                      disabled={addingTireId !== null}
                      className="mt-3 w-full rounded-lg bg-[#27509B] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a3d7a] disabled:opacity-60"
                    >
                      {addingTireId === tire.id ? "Ajout..." : "Ajouter"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
