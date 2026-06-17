import type { RewardStatus } from "../types/loyalty";

/**
 * Paliers de fidélité (miroir de la config backend `loyalty.config.ts`).
 * Sert uniquement à l'affichage : libellés, couleurs et calcul de progression.
 */
export type LoyaltyTier = {
  name: string;
  label: string;
  minPoints: number;
  /** Couleur d'accent du badge (charte Michelin + métaux). */
  color: string;
};

export const LOYALTY_TIERS: LoyaltyTier[] = [
  { name: "BRONZE", label: "Bronze", minPoints: 0, color: "#A9743B" },
  { name: "SILVER", label: "Argent", minPoints: 500, color: "#8C9BA5" },
  { name: "GOLD", label: "Or", minPoints: 1500, color: "#C9A227" },
  { name: "PLATINUM", label: "Platine", minPoints: 4000, color: "#27509B" },
];

export type TierProgress = {
  current: LoyaltyTier;
  next: LoyaltyTier | null;
  /** Progression vers le palier suivant, en pourcentage (0-100). */
  progressPercent: number;
  /** Points restants pour atteindre le palier suivant. */
  pointsToNext: number;
};

export function getTier(tierName: string): LoyaltyTier {
  return (
    LOYALTY_TIERS.find((tier) => tier.name === tierName) ?? LOYALTY_TIERS[0]
  );
}

export function computeTierProgress(points: number): TierProgress {
  let current = LOYALTY_TIERS[0];
  let next: LoyaltyTier | null = null;

  for (let index = 0; index < LOYALTY_TIERS.length; index++) {
    if (points >= LOYALTY_TIERS[index].minPoints) {
      current = LOYALTY_TIERS[index];
      next = LOYALTY_TIERS[index + 1] ?? null;
    }
  }

  if (!next) {
    return { current, next: null, progressPercent: 100, pointsToNext: 0 };
  }

  const span = next.minPoints - current.minPoints;
  const acquired = points - current.minPoints;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((acquired / span) * 100)),
  );

  return {
    current,
    next,
    progressPercent,
    pointsToNext: Math.max(0, next.minPoints - points),
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "Toutes catégories",
  ROAD: "Route",
  TRAIL: "Tout-terrain",
  GRAVEL: "Gravel",
  MIXED: "Mixte",
};

export function formatRewardCategory(category: string | null): string {
  if (!category) return "Toutes catégories";
  return CATEGORY_LABELS[category] ?? category;
}

const REWARD_STATUS_LABELS: Record<RewardStatus, string> = {
  AVAILABLE: "Disponible",
  USED: "Utilisé",
  EXPIRED: "Expiré",
  PAID: "Versée",
};

export function formatRewardStatus(status: RewardStatus): string {
  return REWARD_STATUS_LABELS[status];
}

export function formatExpiry(expiresAt: string | null): string | null {
  if (!expiresAt) return null;
  return new Date(expiresAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
