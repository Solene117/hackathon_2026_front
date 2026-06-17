import type {
  RimType,
  SealingType,
  TerrainType,
  TireFitting,
  TirePerformanceProfile,
  TireUsageType,
} from "../types/tire";

const TERRAIN_LABELS: Record<TerrainType, string> = {
  ASPHALT: "Asphalte",
  HARD_PACKED: "Terrain dur compacté",
  MIXED: "Mixte",
  GRAVEL: "Gravier",
  ROCKY: "Rocheux",
  MUD: "Boueux",
  SOFT: "Meuble",
  SAND: "Sableux",
  WET: "Humide",
  UNKNOWN: "Inconnu",
};

const USAGE_LABELS: Record<TireUsageType, string> = {
  ROAD: "Route",
  GRAVEL: "Gravel",
  MTB: "VTT",
  CITY: "Ville",
  TOURING: "Randonnée",
  COMMUTING: "Quotidien",
  E_BIKE: "Vélo électrique",
};

const RIM_LABELS: Record<RimType, string> = {
  CLINCHER: "Clincher",
  TUBELESS: "Tubeless",
  TUBULAR: "Boyau",
};

const SEALING_LABELS: Record<SealingType, string> = {
  TUBE: "Chambre à air",
  TUBELESS_READY: "Tubeless Ready",
  TUBELESS: "Tubeless",
};

const FITTING_LABELS: Record<TireFitting, string> = {
  FRONT: "Avant",
  REAR: "Arrière",
  FRONT_REAR: "Avant / Arrière",
};

const PERFORMANCE_LABELS: Record<TirePerformanceProfile, string> = {
  COMFORT: "Confort",
  SPEED: "Vitesse",
  GRIP: "Grip",
  DURABILITY: "Durabilité",
  PUNCTURE_PROTECTION: "Anti-crevaison",
};

export function formatTireTerrain(terrain: TerrainType): string {
  return TERRAIN_LABELS[terrain];
}

export function formatTireUsage(usage: TireUsageType): string {
  return USAGE_LABELS[usage];
}

export function formatRimType(rim: RimType): string {
  return RIM_LABELS[rim];
}

export function formatSealingType(sealing: SealingType): string {
  return SEALING_LABELS[sealing];
}

export function formatTireFitting(fitting: TireFitting): string {
  return FITTING_LABELS[fitting];
}

export function formatPerformanceProfile(
  profile: TirePerformanceProfile,
): string {
  return PERFORMANCE_LABELS[profile];
}

export function formatTireDimensions(
  width: number | null,
  diameter: number | null,
  wheelDiameter: string | null,
): string {
  const parts: string[] = [];

  if (width !== null && diameter !== null) {
    parts.push(`${width}-${diameter}`);
  }

  if (wheelDiameter) {
    parts.push(wheelDiameter);
  }

  return parts.length > 0 ? parts.join(" · ") : "—";
}

export function formatPressureRange(min: number, max: number): string {
  return `${min} – ${max} bars`;
}
