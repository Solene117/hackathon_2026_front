import type { TerrainType } from "../types/activity";
import type { User } from "../types/user";

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

export function formatTerrain(terrain: TerrainType): string {
  return TERRAIN_LABELS[terrain];
}

export function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}min`;
  }

  if (minutes > 0) {
    return `${minutes}min ${String(remainingSeconds).padStart(2, "0")}s`;
  }

  return `${remainingSeconds}s`;
}

export function formatKilometers(km: number | null): string {
  if (km == null) return "—";
  return `${km.toFixed(km >= 10 ? 0 : 1)} km`;
}

export function formatActivityDate(
  date: string | null,
  startedAt: string | null,
): string {
  const value = date ?? startedAt;
  if (!value) return "—";

  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function getUserDisplayName(user: User | null): string {
  if (!user) return "Cycliste";
  if (user.firstName) return user.firstName;
  return user.mail.split("@")[0];
}

export function sumKilometers(
  activities: { kilometers: number | null }[],
): number {
  return activities.reduce((total, activity) => total + (activity.kilometers ?? 0), 0);
}
