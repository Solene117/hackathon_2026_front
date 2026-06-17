import { useEffect } from "react";
import { Gift } from "lucide-react";
import Header from "../components/Header";
import LoyaltyCard from "../components/LoyaltyCard";
import RewardCard from "../components/RewardCard";
import InfluencerDashboard from "../components/InfluencerDashboard";
import { useRewards } from "../hooks/useRewards";
import { useInfluencerDashboard } from "../hooks/useInfluencerDashboard";
import { useAuth } from "../contexts/AuthContext";

function InfluencerView() {
  const { dashboard, isLoading, error } = useInfluencerDashboard();

  if (isLoading) {
    return <p className="text-sm text-neutral-600">Chargement...</p>;
  }
  if (error) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    );
  }
  if (!dashboard) return null;

  return <InfluencerDashboard dashboard={dashboard} />;
}

function StandardView() {
  const { rewards, isLoading, error, redeem, pendingId } = useRewards();
  const vouchers = rewards.filter((reward) => reward.type === "DISCOUNT_VOUCHER");

  return (
    <div className="space-y-6">
      <LoyaltyCard variant="full" />

      <section>
        <h2 className="mb-3 text-lg font-bold">Mes bons de réduction</h2>

        {isLoading && <p className="text-sm text-neutral-600">Chargement...</p>}

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

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

export default function Recompenses() {
  const { user, refreshUser } = useAuth();
  const isInfluencer = user?.accountType === "INFLUENCER";

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <div>
      <Header title="Récompenses" />
      <main className="p-5 pb-24">
        {isInfluencer ? <InfluencerView /> : <StandardView />}
      </main>
    </div>
  );
}
