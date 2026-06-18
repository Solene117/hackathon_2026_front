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
import type { TireDetail } from "../../types/tire";

type TireCharacteristicsTabProps = {
  tire: TireDetail;
};

export default function TireCharacteristicsTab({
  tire,
}: TireCharacteristicsTabProps) {
  return (
    <>
      {(tire.familyName || tire.productRange) && (
        <p className="mt-2 text-sm text-neutral-600">
          {[tire.familyName, tire.productRange].filter(Boolean).join(" · ")}
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
              <Chip key={profile}>{formatPerformanceProfile(profile)}</Chip>
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
          <SpecRow label="Usage" value={formatTireUsage(tire.usageType)} />
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
          <SpecRow label="Montage" value={formatTireFitting(tire.fitting)} />
        )}
        <SpecRow
          label="Pression recommandée"
          value={formatPressureRange(tire.minPressure, tire.maxPressure)}
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
    </>
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
