import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TierBadge from "./TierBadge";
import TierProgress from "./TierProgress";

type LoyaltyCardProps = {
  /** "full" pour le hub, "compact" pour un aperçu (dashboard). */
  variant?: "full" | "compact";
};

export default function LoyaltyCard({ variant = "full" }: LoyaltyCardProps) {
  const { user } = useAuth();
  if (!user) return null;

  if (variant === "compact") {
    return (
      <Link
        to="/recompenses"
        className="flex items-center justify-between rounded-xl border border-neutral-300 bg-gradient-to-r from-[#27509B] to-[#1a3d7a] p-4 text-white"
      >
        <div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
            <Sparkles size={14} /> Programme fidélité
          </span>
          <strong className="mt-1 block text-2xl leading-none">
            {user.points} pts
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <TierBadge tierName={user.currentTier} size="sm" />
          <ChevronRight size={20} className="text-white/70" />
        </div>
      </Link>
    );
  }

  return (
    <section className="rounded-2xl border border-neutral-300 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
            <Sparkles size={14} className="text-[#27509B]" /> Mes points
          </span>
          <strong className="mt-1 block text-4xl font-bold text-[#27509B]">
            {user.points}
          </strong>
          <span className="text-sm text-neutral-500">points cumulés</span>
        </div>
        <TierBadge tierName={user.currentTier} />
      </div>

      <div className="mt-5">
        <TierProgress points={user.points} />
      </div>
    </section>
  );
}
