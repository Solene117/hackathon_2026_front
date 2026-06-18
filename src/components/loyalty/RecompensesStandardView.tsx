import LoyaltyCard from "./LoyaltyCard";
import PromoTierCatalog from "./PromoTierCatalog";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import { useRewards } from "../../hooks/useRewards";

export default function RecompensesStandardView() {
  const { rewards, isLoading, error, redeem, pendingId } = useRewards();

  return (
    <div className="space-y-6 pb-2">
      <LoyaltyCard variant="full" />

      <section>
        <h2 className="mb-3 text-lg font-bold text-neutral-900">
          Promotions par palier
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Cumulez des kilomètres pour progresser et débloquer vos réductions.
        </p>

        {isLoading && <LoadingMessage />}
        {error && <ErrorAlert message={error} />}

        {!isLoading && !error && (
          <PromoTierCatalog
            rewards={rewards}
            onUse={(id) => void redeem(id)}
            pendingId={pendingId}
          />
        )}
      </section>
    </div>
  );
}
