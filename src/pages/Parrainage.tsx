import Header from "../components/Header";
import ReferralPanel from "../components/ReferralPanel";
import { useReferrals } from "../hooks/useReferrals";

export default function Parrainage() {
  const { overview, isLoading, error } = useReferrals();

  return (
    <div>
      <Header title="Parrainage" />
      <main className="p-5 pb-24">
        {isLoading && <p className="text-sm text-neutral-600">Chargement...</p>}

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && overview && (
          <ReferralPanel overview={overview} />
        )}
      </main>
    </div>
  );
}
