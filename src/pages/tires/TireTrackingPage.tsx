import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserTire } from "../../api/tires";
import PageShell from "../../components/layout/PageShell";
import ConfirmTireDeleteModal from "../../components/tires/ConfirmTireDeleteModal";
import RecommendationModal from "../../components/tires/RecommendationModal";
import TireDetailModal from "../../components/tires/TireDetailModal";
import {
  TireCurrentSection,
  TireHealthSection,
  TireUsageSection,
} from "../../components/tires/TireTrackingSections";
import { useUserTireInfo } from "../../hooks/useUserTireInfo";
import { useUserTireWear } from "../../hooks/useUserTireWear";
import { getApiErrorMessage } from "../../lib/errors";

export default function TireTrackingPage() {
  const navigate = useNavigate();
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function openDeleteModal() {
    setDeleteError(null);
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  }

  async function handleConfirmDelete() {
    if (validTireId === null) return;

    setDeleteError(null);
    setIsDeleting(true);

    try {
      await deleteUserTire(validTireId);
      navigate("/mes-pneus", { replace: true });
    } catch (err) {
      setDeleteError(getApiErrorMessage(err));
      setIsDeleting(false);
    }
  }

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

      <ConfirmTireDeleteModal
        isOpen={showDeleteModal}
        isSubmitting={isDeleting}
        onConfirm={() => void handleConfirmDelete()}
        onCancel={closeDeleteModal}
      />

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

        <TireUsageSection
          tireInfo={tireInfo}
          isLoading={isTireInfoLoading}
          error={tireInfoError}
          onShowTechnicalDetail={() => setShowTireDetail(true)}
        />

        {validTireId !== null && (
          <div className="pt-4 text-center">
            {deleteError && (
              <p className="mb-3 text-sm text-red-600">{deleteError}</p>
            )}
            <button
              type="button"
              onClick={openDeleteModal}
              disabled={isDeleting}
              className="cursor-pointer text-sm font-semibold text-red-600 disabled:opacity-60"
            >
              Supprimer
            </button>
          </div>
        )}
      </PageShell>
    </>
  );
}
