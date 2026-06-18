import { Bell } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useAlertsStore, useUncheckedAlertsCount } from "../../stores/alertsStore";
import AlertsModal from "./AlertsModal";

export default function AlertsBell() {
  const { isAuthenticated } = useAuth();
  const count = useUncheckedAlertsCount();
  const openModal = useAlertsStore((state) => state.openModal);

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        onClick={openModal}
        aria-label={`Alertes${count > 0 ? `, ${count} non lue${count > 1 ? "s" : ""}` : ""}`}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white shadow-sm">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      <AlertsModal />
    </>
  );
}
