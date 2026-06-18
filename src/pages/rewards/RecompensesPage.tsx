import { useEffect } from "react";
import PageShell from "../../components/layout/PageShell";
import RecompensesInfluencerView from "../../components/loyalty/RecompensesInfluencerView";
import RecompensesStandardView from "../../components/loyalty/RecompensesStandardView";
import { useAuth } from "../../contexts/AuthContext";

export default function RecompensesPage() {
  const { user, refreshUser } = useAuth();
  const isInfluencer = user?.accountType === "INFLUENCER";

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <PageShell title="Récompenses">
      {isInfluencer ? <RecompensesInfluencerView /> : <RecompensesStandardView />}
    </PageShell>
  );
}
