import { List, Map } from "lucide-react";

export type DealersViewMode = "list" | "map";

type DealersViewToggleProps = {
  mode: DealersViewMode;
  onChange: (mode: DealersViewMode) => void;
};

export default function DealersViewToggle({
  mode,
  onChange,
}: DealersViewToggleProps) {
  return (
    <div
      className="inline-flex w-full rounded-lg border border-neutral-200 bg-neutral-50 p-1"
      role="group"
      aria-label="Mode d'affichage des revendeurs"
    >
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={mode === "list"}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
          mode === "list"
            ? "bg-white text-michelin-blue shadow-sm"
            : "text-neutral-600 hover:text-neutral-900"
        }`}
      >
        <List size={16} aria-hidden />
        Liste
      </button>

      <button
        type="button"
        onClick={() => onChange("map")}
        aria-pressed={mode === "map"}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
          mode === "map"
            ? "bg-white text-michelin-blue shadow-sm"
            : "text-neutral-600 hover:text-neutral-900"
        }`}
      >
        <Map size={16} aria-hidden />
        Carte
      </button>
    </div>
  );
}
