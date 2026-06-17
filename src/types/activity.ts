export type ActivitySource = "STRAVA" | "APP_TRACKED";
export type ActivityStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type TerrainType = "ROAD" | "TRAIL" | "GRAVEL" | "MIXED" | "UNKNOWN";

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

export type StartActivityPayload = {
  name?: string;
  terrainType?: TerrainType;
  startedAt?: string;
};
