import { useTireModelDetail } from "../../hooks/useTireModelDetail";
import Chip from "../ui/Chip";
import {
  formatPerformanceProfile,
  formatPressureRange,
  formatRimType,
  formatSealingType,
  formatTireDimensions,
  formatTireFitting,
  formatTireTerrain,
  formatTireUsage,
} from "../../lib/tire-labels";
import ModalPortal from "../ui/ModalPortal";

type TireDetailModalProps = {
  tireId: number;
  onClose: () => void;
};

export default function TireDetailModal({
  tireId,
  onClose,
}: TireDetailModalProps) {
  const { tire, isLoading, error } = useTireModelDetail(tireId);

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
      <div className="w-full max-w-[430px] px-5">
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
              {(tire.familyName || tire.productRange) && (
                <p className="mt-2 text-sm text-neutral-600">
                  {[tire.familyName, tire.productRange]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}

              <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100">
                <span className="text-sm text-neutral-500">Image du pneu</span>
              </div>

              {tire.terrainTypes.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-bold">Terrains adaptés</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tire.terrainTypes.map((terrain) => (
                      <Chip
                        key={terrain}
                        className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-medium"
                      >
                        {formatTireTerrain(terrain)}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {tire.performanceProfiles.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-bold">Profils</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tire.performanceProfiles.map((profile) => (
                      <Chip key={profile}>
                        {formatPerformanceProfile(profile)}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-3">
                <SpecRow
                  label="Dimensions"
                  value={formatTireDimensions(
                    tire.etrtoWidth,
                    tire.etrtoDiameter,
                    tire.wheelDiameter,
                  )}
                />
                {tire.usageType && (
                  <SpecRow
                    label="Usage"
                    value={formatTireUsage(tire.usageType)}
                  />
                )}
                {tire.rimType && (
                  <SpecRow label="Jante" value={formatRimType(tire.rimType)} />
                )}
                {tire.sealingType && (
                  <SpecRow
                    label="Étanchéité"
                    value={formatSealingType(tire.sealingType)}
                  />
                )}
                {tire.fitting && (
                  <SpecRow
                    label="Montage"
                    value={formatTireFitting(tire.fitting)}
                  />
                )}
                <SpecRow
                  label="Pression recommandée"
                  value={formatPressureRange(
                    tire.minPressure,
                    tire.maxPressure,
                  )}
                />
                <SpecRow
                  label="Durée de vie estimée"
                  value={`${tire.maxKilometers.toLocaleString("fr-FR")} km`}
                />
                <SpecRow
                  label="Compatible e-bike"
                  value={tire.eBikeCompatible ? "Oui" : "Non"}
                />
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-3 text-sm last:border-0">
      <span className="text-neutral-500">{label}</span>
      <strong className="text-right">{value}</strong>
    </div>
  );
}
