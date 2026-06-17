import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { checkAlert } from "../api/alerts";
import { useAlerts } from "../hooks/useAlerts";
import { getApiErrorMessage } from "../lib/errors";
import TireDetailModal from "./TireDetailModal";

type AlertsWidgetProps = {
  tireId?: number;
  title?: string;
};

export default function AlertsWidget({
  tireId,
  title = "Alertes",
}: AlertsWidgetProps) {
  const { alerts, isLoading, error, refresh } = useAlerts(tireId);
  const [selectedTireId, setSelectedTireId] = useState<number | null>(null);
  const [checkingId, setCheckingId] = useState<number | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const uncheckedAlerts = alerts.filter((alert) => !alert.isChecked);

  async function handleCheckAlert(alertId: number) {
    setCheckingId(alertId);
    setCheckError(null);

    try {
      await checkAlert(alertId);
      await refresh();
    } catch (err) {
      setCheckError(getApiErrorMessage(err));
    } finally {
      setCheckingId(null);
    }
  }

  return (
    <>
      {selectedTireId !== null && (
        <TireDetailModal
          tireId={selectedTireId}
          onClose={() => setSelectedTireId(null)}
        />
      )}

      <section className="rounded-xl border border-neutral-300 p-5">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>

        {isLoading && (
          <p className="text-sm text-neutral-600">Chargement...</p>
        )}

        {(error || checkError) && (
          <p className="text-sm text-red-600" role="alert">
            {error ?? checkError}
          </p>
        )}

        {!isLoading && !error && uncheckedAlerts.length === 0 && (
          <p className="text-sm text-neutral-600">
            Aucune alerte pour le moment.
          </p>
        )}

        {!isLoading && !error && uncheckedAlerts.length > 0 && (
          <ul className="space-y-3">
            {uncheckedAlerts.map((alert) => {
              const recommendedTires =
                alert.metadata?.recommendedTires ?? [];

              return (
                <li
                  key={alert.id}
                  className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                      <AlertTriangle size={14} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                        {alert.code}
                      </span>
                      <p className="mt-1 text-sm text-neutral-800">
                        {alert.message}
                      </p>

                      {alert.code === "TERRAIN" && recommendedTires.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-neutral-700">
                            Pneus recommandés
                            {recommendedTires[0]?.isFallback
                              ? " (suggestions élargies)"
                              : ""}
                          </p>
                          <ul className="mt-2 space-y-2">
                            {recommendedTires.map((tire) => (
                              <li key={tire.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedTireId(tire.id)}
                                  className="w-full rounded-lg border border-[#27509B]/30 bg-white px-3 py-2 text-left transition hover:border-[#27509B] hover:bg-[#D4E7FA]/40"
                                >
                                  <span className="block text-sm font-semibold text-[#27509B]">
                                    {tire.model}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-neutral-600">
                                    {tire.reason}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleCheckAlert(alert.id)}
                      disabled={checkingId === alert.id}
                      aria-label="Marquer l'alerte comme lue"
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:border-amber-500 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Check size={14} />
                      {checkingId === alert.id ? "…" : "Lu"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
