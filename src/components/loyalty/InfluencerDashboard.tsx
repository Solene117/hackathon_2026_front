import { TrendingUp, Wallet, Users, BadgeEuro } from "lucide-react";
import type { InfluencerDashboard as InfluencerData } from "../../types/loyalty";
import RewardCard from "./RewardCard";

type InfluencerDashboardProps = {
  dashboard: InfluencerData;
};

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-300 bg-[#D4E7FA] p-4">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
        {icon} {label}
      </span>
      <strong className="mt-1 block text-2xl">{value}</strong>
    </div>
  );
}

export default function InfluencerDashboard({
  dashboard,
}: InfluencerDashboardProps) {
  const { referrals, commissions } = dashboard;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#27509B]/30 bg-gradient-to-r from-[#27509B] to-[#1a3d7a] p-5 text-white">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Espace Influenceur
        </span>
        <h2 className="mt-1 text-2xl font-bold">Vos commissions</h2>
        <strong className="mt-2 block text-4xl font-bold">
          {commissions.totalAmount} €
        </strong>
        <div className="mt-3 flex gap-4 text-sm text-white/80">
          <span>En attente : {commissions.pendingAmount} €</span>
          <span>Versé : {commissions.paidAmount} €</span>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <StatTile
          icon={<Users size={14} />}
          label="Invités"
          value={String(referrals.total)}
        />
        <StatTile
          icon={<TrendingUp size={14} />}
          label="Convertis"
          value={String(referrals.converted)}
        />
        <StatTile
          icon={<BadgeEuro size={14} />}
          label="Conversion"
          value={`${Math.round(referrals.conversionRate * 100)}%`}
        />
      </div>

      <section className="rounded-2xl border border-neutral-300 bg-white p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Wallet size={20} className="text-[#27509B]" /> Historique des
          commissions
        </h2>
        {commissions.items.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-600">
            Aucune commission pour le moment. Partagez votre code pour générer
            vos premiers gains.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {commissions.items.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
