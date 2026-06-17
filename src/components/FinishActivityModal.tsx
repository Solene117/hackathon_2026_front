import { useEffect, useState } from "react";
import { fetchTerrainTypes } from "../api/activities";
import { getApiErrorMessage } from "../lib/errors";
import type { TerrainType } from "../types/activity";

type FinishActivityModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  defaultName: string;
  defaultTerrainType: TerrainType;
  onSubmit: (data: { name: string; terrainType: TerrainType }) => void;
  onCancel: () => void;
};

export default function FinishActivityModal({
  isOpen,
  isSubmitting,
  defaultName,
  defaultTerrainType,
  onSubmit,
  onCancel,
}: FinishActivityModalProps) {
  const [name, setName] = useState(defaultName);
  const [terrainType, setTerrainType] = useState<TerrainType>(defaultTerrainType);
  const [terrainOptions, setTerrainOptions] = useState<
    { value: TerrainType; label: string }[]
  >([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setName(defaultName);
    setTerrainType(defaultTerrainType);
    setLoadError(null);
    setIsLoadingOptions(true);

    fetchTerrainTypes()
      .then((options) => {
        setTerrainOptions(options);
      })
      .catch((error) => {
        setLoadError(getApiErrorMessage(error));
      })
      .finally(() => {
        setIsLoadingOptions(false);
      });
  }, [defaultName, defaultTerrainType, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSubmit({
      name: trimmedName,
      terrainType,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <section className="w-full max-w-sm rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold">Terminer la sortie</h2>

        <p className="mt-2 text-sm text-neutral-600">
          Donnez un nom à votre sortie et indiquez le type de terrain parcouru.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="activity-name"
              className="mb-2 block text-sm font-semibold text-neutral-800"
            >
              Nom de la sortie
            </label>
            <input
              id="activity-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#27509B]"
              placeholder="Sortie vélo"
            />
          </div>

          <div>
            <label
              htmlFor="activity-terrain"
              className="mb-2 block text-sm font-semibold text-neutral-800"
            >
              Type de terrain
            </label>
            <select
              id="activity-terrain"
              value={terrainType}
              onChange={(event) =>
                setTerrainType(event.target.value as TerrainType)
              }
              disabled={isSubmitting || isLoadingOptions}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#27509B] disabled:opacity-60"
            >
              {isLoadingOptions && (
                <option value={terrainType}>Chargement...</option>
              )}

              {!isLoadingOptions &&
                terrainOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>

          {loadError && (
            <p className="text-sm text-red-600" role="alert">
              {loadError}
            </p>
          )}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || isLoadingOptions}
              className="w-full rounded-xl bg-[#27509B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#00205B] disabled:opacity-60"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer la sortie"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-[#27509B] px-4 py-3 text-sm font-semibold text-[#27509B] hover:bg-neutral-50 disabled:opacity-60"
            >
              Annuler
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
