import { AlertTriangle, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../ui/ModalPortal";
import { resolveAlertUserTireId } from "../../lib/alert-utils";
import {
  selectUncheckedAlerts,
  useAlertsStore,
} from "../../stores/alertsStore";
import { useUserTiresStore } from "../../stores/userTiresStore";
import type { Alert } from "../../types/alert";

export default function AlertsModal() {
  const navigate = useNavigate();
  const {
    alerts,
    isLoading,
    error,
    isModalOpen,
    checkingId,
    closeModal,
    markAsRead,
  } = useAlertsStore();
  const tires = useUserTiresStore((state) => state.tires);

  if (!isModalOpen) return null;

  const uncheckedAlerts = selectUncheckedAlerts(alerts);

  async function handleAlertClick(alert: Alert) {
    const userTireId = resolveAlertUserTireId(alert, tires);
    if (userTireId == null) {
      closeModal();
      navigate("/mes-pneus");
      return;
    }

    await markAsRead(alert.id);
    closeModal();
    navigate(`/suivi-pneu/${userTireId}`);
  }

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] md:items-center md:p-6"
        onClick={closeModal}
      >
        <section
          className="flex max-h-[85vh] w-full max-w-[430px] flex-col rounded-t-3xl bg-white shadow-2xl md:max-h-[min(85vh,720px)] md:max-w-lg md:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header modale */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Alertes</h2>
            {!isLoading && uncheckedAlerts.length > 0 && (
              <p className="text-xs text-neutral-500">
                {uncheckedAlerts.length} alerte
                {uncheckedAlerts.length > 1 ? "s" : ""} non lue
                {uncheckedAlerts.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Contenu */}
        <div className="overflow-y-auto px-5 py-4">
          {isLoading && (
            <p className="py-8 text-center text-sm text-neutral-500">
              Chargement...
            </p>
          )}

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && uncheckedAlerts.length === 0 && (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-michelin-green/10">
                <Check size={22} className="text-michelin-green" />
              </div>
              <p className="text-sm font-medium text-neutral-700">
                Aucune alerte en attente
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Vos pneus sont sous surveillance
              </p>
            </div>
          )}

          {!isLoading && uncheckedAlerts.length > 0 && (
            <ul className="space-y-3">
              {uncheckedAlerts.map((alert) => (
                <li key={alert.id}>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 transition hover:border-amber-200 hover:bg-amber-50">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => void handleAlertClick(alert)}
                        className="group flex min-w-0 flex-1 items-start gap-3 text-left"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-400/20">
                          <AlertTriangle size={16} className="text-amber-600" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700">
                            {alert.code}
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-neutral-800">
                            {alert.message}
                          </span>
                          <span className="mt-2 block text-xs font-semibold text-michelin-green opacity-0 transition group-hover:opacity-100">
                            Voir le pneu →
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => void markAsRead(alert.id)}
                        disabled={checkingId === alert.id}
                        aria-label="Marquer l'alerte comme lue"
                        className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-neutral-600 transition hover:border-michelin-green hover:text-michelin-green disabled:opacity-50"
                      >
                        <Check size={12} />
                        {checkingId === alert.id ? "…" : "Lu"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
    </ModalPortal>
  );
}
