import { Gift } from "lucide-react";
import LoyaltyCard from "./LoyaltyCard";
import RewardCard from "./RewardCard";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import { useRewards } from "../../hooks/useRewards";

export default function RecompensesStandardView() {
  const { rewards, isLoading, error, redeem, pendingId } = useRewards();
  const vouchers = rewards.filter(
    (reward) => reward.type === "DISCOUNT_VOUCHER",
  );

  return (
    <div className="space-y-6">
      <LoyaltyCard variant="full" />

      <section>
        <h2 className="mb-3 text-lg font-bold">Mes bons de réduction</h2>

        {isLoading && <LoadingMessage />}

        {error && <ErrorAlert message={error} />}

        {!isLoading && !error && vouchers.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center">
            <Gift size={28} className="mx-auto text-[#27509B]" />
            <p className="mt-2 text-sm text-neutral-600">
              Aucun bon pour l'instant. Cumulez des points avec vos sorties et
              vos parrainages pour débloquer des réductions.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {vouchers.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onUse={(id) => void redeem(id)}
              isPending={pendingId === reward.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
