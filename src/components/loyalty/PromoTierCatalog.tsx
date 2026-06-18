import { Check, Lock, Ticket } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  computeTierProgress,
  formatExpiry,
  formatRewardCategory,
} from "../../lib/loyalty";
import type { Reward } from "../../types/loyalty";

type PromoTierDef = {
  tierName: string;
  label: string;
  minPoints: number;
  color: string;
  bgColor: string;
  discountPercent: number;
  category: string;
};

const PROMO_TIERS: PromoTierDef[] = [
  {
    tierName: "SILVER",
    label: "Argent",
    minPoints: 500,
    color: "#8C9BA5",
    bgColor: "#8C9BA515",
    discountPercent: 10,
    category: "ROAD",
  },
  {
    tierName: "GOLD",
    label: "Or",
    minPoints: 1500,
    color: "#C9A227",
    bgColor: "#C9A22712",
    discountPercent: 15,
    category: "ALL",
  },
  {
    tierName: "PLATINUM",
    label: "Platine",
    minPoints: 4000,
    color: "#27509B",
    bgColor: "#27509B0f",
    discountPercent: 20,
    category: "ALL",
  },
];

type Props = {
  rewards: Reward[];
  onUse?: (id: number) => void;
  pendingId?: number | null;
};

export default function PromoTierCatalog({
  rewards,
  onUse,
  pendingId,
}: Props) {
  const { user } = useAuth();
  const points = user?.points ?? 0;
  const { next: nextTier, progressPercent, pointsToNext } =
    computeTierProgress(points);

  return (
    <div className="space-y-3">
      {PROMO_TIERS.map((promo) => {
        const isUnlocked = points >= promo.minPoints;
        const isNext = nextTier?.name === promo.tierName;
        const pointsForThis = isNext
          ? pointsToNext
          : Math.max(0, promo.minPoints - points);

        const reward = rewards.find(
          (r) =>
            r.source === "TIER" &&
            r.type === "DISCOUNT_VOUCHER" &&
            r.reference?.endsWith(`:${promo.tierName}`),
        );

        return (
          <PromoTierCard
            key={promo.tierName}
            promo={promo}
            isUnlocked={isUnlocked}
            isNext={isNext}
            progressPercent={progressPercent}
            pointsForThis={pointsForThis}
            reward={reward ?? null}
            onUse={onUse}
            pendingId={pendingId}
          />
        );
      })}
    </div>
  );
}

type CardProps = {
  promo: PromoTierDef;
  isUnlocked: boolean;
  isNext: boolean;
  progressPercent: number;
  pointsForThis: number;
  reward: Reward | null;
  onUse?: (id: number) => void;
  pendingId?: number | null;
};

function PromoTierCard({
  promo,
  isUnlocked,
  isNext,
  progressPercent,
  pointsForThis,
  reward,
  onUse,
  pendingId,
}: CardProps) {
  const isAvailable = reward?.status === "AVAILABLE";
  const isConsumed =
    reward?.status === "USED" || reward?.status === "EXPIRED";

  if (isUnlocked) {
    return (
      <article
        className="rounded-2xl border p-4"
        style={{
          borderColor: `${promo.color}35`,
          backgroundColor: promo.bgColor,
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
            style={{ backgroundColor: promo.color }}
          >
            -{promo.discountPercent}%
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: promo.color }}
              >
                Palier {promo.label}
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-michelin-green/15 px-2 py-0.5 text-[10px] font-bold text-michelin-green">
                <Check size={9} strokeWidth={3} /> Débloqué
              </span>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-neutral-800">
              -{promo.discountPercent}%{" "}
              <span className="font-normal text-neutral-500">
                {formatRewardCategory(promo.category)}
              </span>
            </p>
          </div>

          <Ticket size={18} className="mt-0.5 shrink-0 text-neutral-300" />
        </div>

        {/* Bon disponible */}
        {isAvailable && reward && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-white px-3 py-2.5">
            <div className="min-w-0">
              <span className="block font-mono text-xs font-bold text-neutral-800">
                {reward.code}
              </span>
              {reward.expiresAt && (
                <span className="text-[10px] text-neutral-400">
                  Expire le {formatExpiry(reward.expiresAt)}
                </span>
              )}
            </div>
            {onUse && (
              <button
                type="button"
                onClick={() => onUse(reward.id)}
                disabled={pendingId === reward.id}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition disabled:opacity-50"
                style={{ backgroundColor: promo.color }}
              >
                {pendingId === reward.id ? "…" : "Utiliser"}
              </button>
            )}
          </div>
        )}

        {/* Bon consommé */}
        {isConsumed && reward && (
          <p className="mt-2 text-[11px] text-neutral-400">
            {reward.status === "USED"
              ? "Bon déjà utilisé."
              : "Bon expiré."}
          </p>
        )}

        {/* Pas encore de bon (en attente génération) */}
        {!reward && (
          <p className="mt-2 text-[11px] text-neutral-400">
            Bon en cours de génération…
          </p>
        )}
      </article>
    );
  }

  /* ── Carte verrouillée (prochaine en cours ou encore loin) ── */
  return (
    <article
      className={`rounded-2xl border p-4 transition-all ${
        isNext
          ? "border-neutral-200 bg-white shadow-sm"
          : "border-neutral-100 bg-neutral-50/70 opacity-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
            isNext ? "text-white" : "bg-neutral-200 text-neutral-400"
          }`}
          style={isNext ? { backgroundColor: promo.color } : undefined}
        >
          {isNext ? (
            `-${promo.discountPercent}%`
          ) : (
            <Lock size={17} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={isNext ? { color: promo.color } : { color: "#aaa" }}
            >
              Palier {promo.label}
            </span>
            {isNext && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                En cours
              </span>
            )}
          </div>
          <p
            className={`mt-0.5 text-sm font-semibold ${
              isNext ? "text-neutral-800" : "text-neutral-400"
            }`}
          >
            -{promo.discountPercent}%{" "}
            <span className="font-normal">
              {formatRewardCategory(promo.category)}
            </span>
          </p>
        </div>

        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-neutral-400"
          style={
            isNext ? { color: promo.color, backgroundColor: `${promo.color}15` } : undefined
          }
        >
          {promo.minPoints} pts
        </span>
      </div>

      {/* Barre de progression (uniquement pour le palier suivant) */}
      {isNext && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
            <span style={{ color: promo.color }}>Progression</span>
            <span className="text-neutral-500">
              Plus que{" "}
              <strong className="text-neutral-800">{pointsForThis} pts</strong>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: promo.color,
              }}
            />
          </div>
        </div>
      )}

      {/* Distance pour les paliers non-next */}
      {!isNext && (
        <p className="mt-2 text-[11px] text-neutral-400">
          <Lock size={10} className="mr-1 inline" />
          {pointsForThis} pts pour débloquer
        </p>
      )}
    </article>
  );
}
