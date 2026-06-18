import type { Alert } from "../types/alert";
import type { UserTire } from "../types/tire";

/**
 * Résout le userTireId d'une alerte à partir du message si l'API ne le fournit pas.
 * Format attendu : "Votre pneu {model} n'est pas compatible..."
 */
export function resolveAlertUserTireId(
  alert: Alert,
  tires: UserTire[],
): number | null {
  if (alert.userTireId != null && !Number.isNaN(alert.userTireId)) {
    return alert.userTireId;
  }

  const match = tires.find((tire) => alert.message.includes(tire.model));
  return match?.id ?? null;
}
