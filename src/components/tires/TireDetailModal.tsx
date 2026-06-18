import { useState } from "react";
import { useTireModelDetail } from "../../hooks/useTireModelDetail";
import TireDealersTab from "../dealers/TireDealersTab";
import TireCharacteristicsTab from "./TireCharacteristicsTab";
import ModalPortal from "../ui/ModalPortal";

type TireDetailModalProps = {
  tireId: number;
  tireImage?: string | null;
  onClose: () => void;
};

type ModalTab = "characteristics" | "dealers";

export default function TireDetailModal({
  tireId,
  tireImage,
  onClose,
}: TireDetailModalProps) {
  const { tire, isLoading, error } = useTireModelDetail(tireId);
  const [activeTab, setActiveTab] = useState<ModalTab>("characteristics");

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
      <div className="w-full">
        <section className="max-h-[85vh] overflow-y-auto rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold leading-tight">
              {isLoading ? "Chargement…" : (tire?.model ?? "Détail du pneu")}
            </h1>

            <button
              onClick={onClose}
              className="text-xl font-bold text-neutral-500 hover:text-[#27509B]"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {isLoading && (
            <p className="mt-4 text-sm text-neutral-600">
              Chargement des spécifications…
            </p>
          )}

          {tire && (
            <>
              <div
                className="mt-4 flex rounded-lg border border-neutral-200 bg-neutral-50 p-1"
                role="tablist"
                aria-label="Sections du pneu"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "characteristics"}
                  onClick={() => setActiveTab("characteristics")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    activeTab === "characteristics"
                      ? "bg-white text-michelin-blue shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Caractéristiques
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "dealers"}
                  onClick={() => setActiveTab("dealers")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    activeTab === "dealers"
                      ? "bg-white text-michelin-blue shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Revendeurs
                </button>
              </div>

              <div
                role="tabpanel"
                hidden={activeTab !== "characteristics"}
                className={activeTab !== "characteristics" ? "hidden" : undefined}
              >
                <TireCharacteristicsTab tire={tire} tireImage={tireImage} />
              </div>

              <div
                role="tabpanel"
                hidden={activeTab !== "dealers"}
                className={activeTab !== "dealers" ? "hidden" : undefined}
              >
                {activeTab === "dealers" && <TireDealersTab tireId={tireId} />}
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full rounded-lg border border-[#27509B] bg-white px-4 py-3 text-sm font-bold text-[#27509B] transition hover:bg-neutral-100"
              >
                Fermer
              </button>
            </>
          )}
        </section>
      </div>
    </div>
    </ModalPortal>
  );
}
