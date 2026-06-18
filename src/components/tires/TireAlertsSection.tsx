import { AlertTriangle, Check } from "lucide-react";
import { useAlerts } from "../../hooks/useAlerts";
import { useAlertsStore } from "../../stores/alertsStore";
import type { Alert } from "../../types/alert";

type TireAlertsSectionProps = {
  tireId: number;
};

export default function TireAlertsSection({ tireId }: TireAlertsSectionProps) {
  const { alerts, isLoading, error, refresh } = useAlerts(tireId);
  const { checkingId, markAsRead } = useAlertsStore();

  const activeAlerts = alerts.filter((alert) => !alert.isChecked);

  if (!isLoading && !error && activeAlerts.length === 0) {
    return null;
  }

  async function handleMarkAsRead(alertId: number) {
    await markAsRead(alertId);
    await refresh();
  }

  return (
    <section className="overflow-hidden rounded-xl border border-amber-100 bg-gradient-to-b from-amber-50/80 to-white">
      <div className="flex items-center gap-2.5 border-b border-amber-100/80 px-5 py-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/20">
          <AlertTriangle size={16} className="text-amber-600" />
        </span>
        <div>
          <h2 className="text-base font-bold text-neutral-900">Alertes actives</h2>
          {!isLoading && activeAlerts.length > 0 && (
            <p className="text-xs text-neutral-500">
              {activeAlerts.length} alerte{activeAlerts.length > 1 ? "s" : ""} en
              cours sur ce pneu
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        {isLoading && (
          <p className="py-2 text-center text-sm text-neutral-500">Chargement…</p>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!isLoading &&
          activeAlerts.map((alert) => (
            <TireAlertCard
              key={alert.id}
              alert={alert}
              isPending={checkingId === alert.id}
              onMarkAsRead={() => void handleMarkAsRead(alert.id)}
            />
          ))}
      </div>
    </section>
  );
}

type TireAlertCardProps = {
  alert: Alert;
  isPending: boolean;
  onMarkAsRead: () => void;
};

function TireAlertCard({ alert, isPending, onMarkAsRead }: TireAlertCardProps) {
  const recommendations = alert.metadata?.recommendedTires ?? [];

  return (
    <article className="rounded-xl border border-amber-100/80 bg-white/90 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
            {alert.code}
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">
            {alert.message}
          </p>

          {recommendations.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {recommendations.map((tire) => (
                <li
                  key={tire.id}
                  className="rounded-lg bg-michelin-blue-light-01/60 px-3 py-2 text-xs text-neutral-700"
                >
                  <span className="font-semibold text-michelin-blue">
                    {tire.model}
                  </span>
                  {tire.reason && (
                    <span className="text-neutral-500"> — {tire.reason}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={onMarkAsRead}
          disabled={isPending}
          aria-label="Marquer l'alerte comme lue"
          className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-neutral-600 transition hover:border-michelin-green hover:text-michelin-green disabled:opacity-50"
        >
          <Check size={12} />
          {isPending ? "…" : "Lu"}
        </button>
      </div>
    </article>
  );
}
