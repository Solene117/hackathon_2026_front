export type ActivitySource = "STRAVA" | "APP_TRACKED";
export type ActivityStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
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

export type ActivityTireSummary = {
  userTireId: number;
  name: string;
  position: string | null;
};

export type Activity = {
  id: number;
  userId: number;
  stravaActivityId: string | null;
  name: string | null;
  source: ActivitySource;
  status: ActivityStatus;
  startPosition: number | null;
  kilometers: number | null;
  durationSeconds: number | null;
  terrainType: TerrainType;
  startedAt: string | null;
  endedAt: string | null;
  date: string | null;
  createdAt: string;
  updatedAt: string;
  tires: { tireId: number; activityId: number }[];
};

export type ActivityDetail = Omit<Activity, "tires"> & {
  tires: ActivityTireSummary[];
};

export type StartActivityPayload = {
  name?: string;
  terrainType?: TerrainType;
  startedAt?: string;
};

export type FinishActivityPayload = {
  name?: string;
  terrainType?: TerrainType;
  endedAt?: string;
};

export type TerrainTypeOption = {
  value: TerrainType;
  label: string;
};
