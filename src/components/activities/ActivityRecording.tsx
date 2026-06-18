import { ChevronLeft, Pause, Play, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmActivityDeleteModal from "./ConfirmActivityDeleteModal";
import FinishActivityModal from "./FinishActivityModal";
import {
  formatDistanceKm,
  formatElapsedTime,
  formatElevationMeters,
  formatSpeedKmh,
} from "../../lib/activity-metrics";
import { useActivityRecording } from "../../hooks/useActivityRecording";
import type { ActivityDetail, TerrainType } from "../../types/activity";

type ActivityRecordingProps = {
  initialActivity?: ActivityDetail;
};

function MetricValue({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-5xl font-bold tracking-tight text-black">{children}</p>
  );
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-neutral-500">{children}</p>;
}

export default function ActivityRecording({
  initialActivity,
}: ActivityRecordingProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const handleExit = useCallback(() => {
    navigate("/activites");
  }, [navigate]);

  useEffect(() => {
    if (!Number.isFinite(activityId)) {
      navigate("/activites", { replace: true });
    }
  }, [activityId, navigate]);

  const recording = useActivityRecording({
    activityId,
    onExit: handleExit,
    initialActivity,
  });

  const {
    isLoading,
    phase,
    elapsedSeconds,
    metrics,
    error,
    isSubmitting,
    activityName,
    activityTerrainType,
    start,
    pause,
    resume,
    finish,
    remove,
  } = recording;

  function openFinishModal() {
    setShowFinishModal(true);
  }

  function closeFinishModal() {
    if (!isSubmitting) {
      setShowFinishModal(false);
    }
  }

  function handleConfirmFinish(data: {
    name: string;
    terrainType: TerrainType;
  }) {
    void finish(data);
  }

  function openDeleteModal() {
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    if (!isSubmitting) {
      setShowDeleteModal(false);
    }
  }

  function handleConfirmDelete() {
    void remove();
  }

  if (!Number.isFinite(activityId)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex h-screen max-w-[430px] items-center justify-center bg-white">
        <p className="text-sm text-neutral-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-[430px] flex-col bg-white">
      <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
        <button
          type="button"
          onClick={openDeleteModal}
          className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
          aria-label="Retour"
        >
          <ChevronLeft size={28} />
        </button>

        <p className="text-2xl font-semibold tabular-nums text-black">
          {formatElapsedTime(elapsedSeconds)}
        </p>

        <div className="h-10 w-10" />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="text-center">
          <MetricValue>{formatSpeedKmh(metrics.speedKmh)}</MetricValue>
          <MetricLabel>Vitesse (km/h)</MetricLabel>
        </div>

        <div className="mt-16 grid w-full max-w-xs grid-cols-2 gap-x-8 gap-y-10">
          <div className="text-center">
            <MetricValue>{formatDistanceKm(metrics.distanceKm)}</MetricValue>
            <MetricLabel>Distance (km)</MetricLabel>
          </div>

          <div className="text-center">
            <MetricValue>
              {formatElevationMeters(metrics.elevationGainM)}
            </MetricValue>
            <MetricLabel>Dénivelé (m)</MetricLabel>
          </div>

          <div className="col-span-2 text-center">
            <MetricValue>
              {formatElevationMeters(metrics.currentElevationM)}
            </MetricValue>
            <MetricLabel>Altitude (m)</MetricLabel>
          </div>
        </div>

        {error && (
          <p className="mt-8 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </main>

      <footer className="space-y-3 border-t border-neutral-200 px-5 py-6">
        {phase === "preparing" && (
          <button
            type="button"
            onClick={start}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 text-base font-semibold text-white hover:bg-[#00205B] disabled:opacity-60"
          >
            <Play size={20} />
            Démarrer
          </button>
        )}

        {phase === "recording" && (
          <button
            type="button"
            onClick={pause}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 text-base font-semibold text-white hover:bg-[#00205B] disabled:opacity-60"
          >
            <Pause size={20} />
            Pause
          </button>
        )}

        {phase === "paused" && (
          <>
            <button
              type="button"
              onClick={resume}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27509B] px-4 py-3 text-base font-semibold text-white hover:bg-[#00205B] disabled:opacity-60"
            >
              <Play size={20} />
              Reprendre
            </button>

            <button
              type="button"
              onClick={openFinishModal}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-[#27509B] px-4 py-3 text-base font-semibold text-[#27509B] hover:bg-neutral-50 disabled:opacity-60"
            >
              Terminer
            </button>

            <button
              type="button"
              onClick={openDeleteModal}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 py-2 text-base font-semibold text-red-600 disabled:opacity-60"
            >
              <Trash2 size={18} />
              Supprimer
            </button>
          </>
        )}
      </footer>

      <ConfirmActivityDeleteModal
        isOpen={showDeleteModal}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />

      <FinishActivityModal
        isOpen={showFinishModal}
        isSubmitting={isSubmitting}
        defaultName={activityName}
        defaultTerrainType={activityTerrainType}
        onSubmit={handleConfirmFinish}
        onCancel={closeFinishModal}
      />
    </div>
  );
}
