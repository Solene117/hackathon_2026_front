import { useState } from "react";
import { useParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import AlertsWidget from "../../components/tires/AlertsWidget";
import RecommendationModal from "../../components/tires/RecommendationModal";
import {
  TireCurrentSection,
  TireHealthSection,
  TireUsageSection,
} from "../../components/tires/TireTrackingSections";

export default function TireTrackingPage() {
  const { tireId: tireIdParam } = useParams<{ tireId: string }>();
  const tireId = tireIdParam ? Number(tireIdParam) : undefined;
  const [showRecommendation, setShowRecommendation] = useState(false);

  return (
    <>
      {showRecommendation && (
        <RecommendationModal onClose={() => setShowRecommendation(false)} />
      )}

      <PageShell title="Suivi du pneu" mainClassName="space-y-5 p-5 pb-24">
        <TireCurrentSection />

        <TireHealthSection
          health={42}
          label="Bon état"
          onShowRecommendation={() => setShowRecommendation(true)}
        />

        {tireId !== undefined && !Number.isNaN(tireId) && (
          <AlertsWidget tireId={tireId} />
        )}

        <TireUsageSection />
      </PageShell>
    </>
  );
}
