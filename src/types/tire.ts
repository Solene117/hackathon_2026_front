export type TerrainType =
  | "ASPHALT"
  | "HARD_PACKED"
  | "MIXED"
  | "GRAVEL"
  | "ROCKY"
  | "MUD"
  | "SOFT"
  | "SAND"
  | "WET"
  | "UNKNOWN";

export type TireUsageType =
  | "ROAD"
  | "GRAVEL"
  | "MTB"
  | "CITY"
  | "TOURING"
  | "COMMUTING"
  | "E_BIKE";

export type RimType = "CLINCHER" | "TUBELESS" | "TUBULAR";

export type SealingType = "TUBE" | "TUBELESS_READY" | "TUBELESS";

export type TireFitting = "FRONT" | "REAR" | "FRONT_REAR";

export type TirePerformanceProfile =
  | "COMFORT"
  | "SPEED"
  | "GRIP"
  | "DURABILITY"
  | "PUNCTURE_PROTECTION";

export type TireDetail = {
  id: number;
  model: string;
  terrainTypes: TerrainType[];
  usageType: TireUsageType | null;
  wheelDiameter: string | null;
  etrtoDiameter: number | null;
  etrtoWidth: number | null;
  rimType: RimType | null;
  sealingType: SealingType | null;
  fitting: TireFitting | null;
  eBikeCompatible: boolean;
  performanceProfiles: TirePerformanceProfile[];
  familyName: string | null;
  productRange: string | null;
  minPressure: number;
  maxPressure: number;
  maxKilometers: number;
};

export type UserTire = {
  id: number;
  position: string | null;
  kilometers: number | null;
  smartTire: boolean | null;
  isActive: boolean | null;
  model: string;
  health: number;
};

export type UserTireInfo = {
  id: number;
  kilometers: number | null;
  lastPressureBar: number | null;
  smartTire: boolean | null;
};

export type UserTireWear = {
  model: string;
  position: string | null;
  healthScore: number | null;
  healthStatus: "good" | "warning" | "replace_soon" | string | null;
};
