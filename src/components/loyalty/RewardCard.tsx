import { Ticket, Wallet } from "lucide-react";
import type { Reward } from "../../types/loyalty";
import {
  formatExpiry,
  formatRewardCategory,
  formatRewardStatus,
} from "../../lib/loyalty";

type RewardCardProps = {
  reward: Reward;
  onUse?: (rewardId: number) => void;
  isPending?: boolean;
};

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  USED: "bg-neutral-200 text-neutral-600",
  EXPIRED: "bg-red-100 text-red-600",
  PAID: "bg-green-100 text-green-700",
};

export default function RewardCard({
  reward,
  onUse,
  isPending = false,
}: RewardCardProps) {
  const isCommission = reward.type === "COMMISSION";
  const expiry = formatExpiry(reward.expiresAt);
  const canUse =
    !isCommission && reward.status === "AVAILABLE" && Boolean(onUse);

  return (
    <article className="rounded-xl border border-neutral-300 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4E7FA] text-[#27509B]"
            aria-hidden
          >
            {isCommission ? <Wallet size={22} /> : <Ticket size={22} />}
          </span>
          <div>
            <h3 className="font-bold leading-tight">
              {isCommission
                ? `Commission ${reward.amount ?? 0} €`
                : `-${reward.discountPercent ?? 0}%`}
            </h3>
            <p className="text-sm text-neutral-600">
              {isCommission
                ? "Cashback parrainage"
                : formatRewardCategory(reward.category)}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            STATUS_STYLES[reward.status] ?? "bg-neutral-200 text-neutral-600"
          }`}
        >
          {formatRewardStatus(reward.status)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          <span className="font-mono font-semibold text-neutral-700">
            {reward.code}
          </span>
          {expiry && <span className="ml-2">· Expire le {expiry}</span>}
        </div>

        {canUse && (
          <button
            type="button"
            onClick={() => onUse?.(reward.id)}
            disabled={isPending}
            className="rounded-lg bg-[#27509B] px-3 py-1.5 text-sm font-bold text-white hover:bg-[#1a3d7a] disabled:opacity-60"
          >
            {isPending ? "..." : "Utiliser"}
          </button>
        )}
      </div>
    </article>
  );
}
