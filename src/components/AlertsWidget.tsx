import { AlertTriangle } from "lucide-react";
import { useAlerts } from "../hooks/useAlerts";

type AlertsWidgetProps = {
  tireId?: number;
  title?: string;
};

export default function AlertsWidget({
  tireId,
  title = "Alertes",
}: AlertsWidgetProps) {
  const { alerts, isLoading, error } = useAlerts(tireId);
  const uncheckedAlerts = alerts.filter((alert) => !alert.isChecked);

  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>

      {isLoading && (
        <p className="text-sm text-neutral-600">Chargement...</p>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && uncheckedAlerts.length === 0 && (
        <p className="text-sm text-neutral-600">
          Aucune alerte pour le moment.
        </p>
      )}

      {!isLoading && !error && uncheckedAlerts.length > 0 && (
        <ul className="space-y-3">
          {uncheckedAlerts.map((alert) => (
            <li
              key={alert.id}
              className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                <AlertTriangle size={14} />
              </span>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  {alert.code}
                </span>
                <p className="mt-1 text-sm text-neutral-800">{alert.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
