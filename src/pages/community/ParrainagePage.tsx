import PageShell from "../../components/layout/PageShell";
import ReferralPanel from "../../components/loyalty/ReferralPanel";
import ErrorAlert from "../../components/ui/ErrorAlert";
import LoadingMessage from "../../components/ui/LoadingMessage";
import { useReferrals } from "../../hooks/useReferrals";

export default function ParrainagePage() {
  const { overview, isLoading, error } = useReferrals();

  return (
    <PageShell title="Parrainage">
      {isLoading && <LoadingMessage />}

      {error && <ErrorAlert message={error} />}

      {!isLoading && !error && overview && (
        <ReferralPanel overview={overview} />
      )}
    </PageShell>
  );
}
