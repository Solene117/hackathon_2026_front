import { useState } from "react";
import { useParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import RecommendationModal from "../../components/tires/RecommendationModal";
import TireDetailModal from "../../components/tires/TireDetailModal";
import {
  TireCurrentSection,
  TireHealthSection,
  TireUsageSection,
} from "../../components/tires/TireTrackingSections";
import { useUserTireInfo } from "../../hooks/useUserTireInfo";

export default function TireTrackingPage() {
  const { tireId: tireIdParam } = useParams<{ tireId: string }>();
  const tireId = tireIdParam ? Number(tireIdParam) : undefined;
  const validTireId =
    tireId !== undefined && !Number.isNaN(tireId) ? tireId : null;
  const {
    tireInfo,
    isLoading: isTireInfoLoading,
    error: tireInfoError,
  } = useUserTireInfo(validTireId);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showTireDetail, setShowTireDetail] = useState(false);

  return (
    <>
      {showRecommendation && (
        <RecommendationModal onClose={() => setShowRecommendation(false)} />
      )}

      {showTireDetail && validTireId !== null && (
        <TireDetailModal
          tireId={validTireId}
          onClose={() => setShowTireDetail(false)}
        />
      )}

      <PageShell title="Suivi du pneu" mainClassName="space-y-5 p-5 pb-24">
        <TireCurrentSection smartTire={tireInfo?.smartTire === true} />

        <TireHealthSection
          health={42}
          label="Bon état"
          onShowRecommendation={() => setShowRecommendation(true)}
        />

        <TireUsageSection
          tireInfo={tireInfo}
          isLoading={isTireInfoLoading}
          error={tireInfoError}
          onShowTechnicalDetail={() => setShowTireDetail(true)}
        />
      </PageShell>
    </>
  );
}
