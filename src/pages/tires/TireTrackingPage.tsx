import { useState } from "react";
import { useParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import AlertsWidget from "../../components/tires/AlertsWidget";
import RecommendationModal from "../../components/tires/RecommendationModal";
import TireDetailModal from "../../components/tires/TireDetailModal";
import {
  TireCurrentSection,
  TireHealthSection,
  TireUsageSection,
} from "../../components/tires/TireTrackingSections";
import { useUserTireInfo } from "../../hooks/useUserTireInfo";
import { useUserTireWear } from "../../hooks/useUserTireWear";

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
  const {
    tireWear,
    isLoading: isTireWearLoading,
    error: tireWearError,
  } = useUserTireWear(validTireId);
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
        <TireCurrentSection
          model={tireWear?.model}
          position={tireWear?.position}
          smartTire={tireInfo?.smartTire === true}
          isLoading={isTireWearLoading}
          error={tireWearError}
        />

        <TireHealthSection
          healthScore={tireWear?.healthScore ?? null}
          healthStatus={tireWear?.healthStatus ?? null}
          isLoading={isTireWearLoading}
          error={tireWearError}
          onShowRecommendation={() => setShowRecommendation(true)}
        />

        {validTireId !== null && (
          <AlertsWidget tireId={validTireId} />
        )}

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
