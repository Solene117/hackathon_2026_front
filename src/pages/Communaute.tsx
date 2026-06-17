import { useEffect } from "react";
import { Gift, Ticket, ChevronRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LoyaltyCard from "../components/LoyaltyCard";
import { useAuth } from "../contexts/AuthContext";

type HubLinkProps = {
  to: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function HubLink({ to, icon, title, subtitle }: HubLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-xl border border-neutral-300 bg-white p-4 hover:bg-[#D4E7FA]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4E7FA] text-[#27509B]">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="font-bold leading-tight">{title}</h3>
        <p className="text-sm text-neutral-600">{subtitle}</p>
      </div>
      <ChevronRight size={20} className="text-neutral-400" />
    </Link>
  );
}

export default function Communaute() {
  const { user, refreshUser } = useAuth();
  const isInfluencer = user?.accountType === "INFLUENCER";

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <div>
      <Header title="Communauté" />

      <main className="space-y-6 p-5 pb-24">
        <LoyaltyCard variant="full" />

        <div className="space-y-3">
          <HubLink
            to="/recompenses"
            icon={isInfluencer ? <Crown size={22} /> : <Ticket size={22} />}
            title={isInfluencer ? "Espace influenceur" : "Mes récompenses"}
            subtitle={
              isInfluencer
                ? "Suivez vos commissions et conversions"
                : "Bons de réduction et paliers de fidélité"
            }
          />

          <HubLink
            to="/parrainage"
            icon={<Gift size={22} />}
            title="Parrainer un ami"
            subtitle="Partagez votre code et gagnez des points"
          />
        </div>
      </main>
    </div>
  );
}
