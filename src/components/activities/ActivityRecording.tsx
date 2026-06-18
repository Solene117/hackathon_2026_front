import { ArrowLeft, MapPin, Mountain, Pause, Play, Timer, Trash2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmActivityDeleteModal from "./ConfirmActivityDeleteModal";
import FinishActivityModal from "./FinishActivityModal";
import {
  formatDistanceKm,
  formatElapsedTime,
  formatElevationMeters,
  formatSpeedKmh,
} from "../../lib/activity-metrics";
import { formatTerrain } from "../../lib/format";
import { useRecordingStore } from "../../stores/recordingStore";
import type { ActivityDetail, TerrainType } from "../../types/activity";

type ActivityRecordingProps = {
  initialActivity?: ActivityDetail;
};

/** Tile de stat secondaire */
function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl bg-neutral-50 px-4 py-3">
      <span className="text-neutral-400">{icon}</span>
      <span className="text-2xl font-black tabular-nums leading-none text-neutral-900">
        {value}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </span>
    </div>
  );
}

export default function ActivityRecording({
  initialActivity,
}: ActivityRecordingProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const {
    attach,
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
  } = useRecordingStore();

  useEffect(() => {
    if (!Number.isFinite(activityId)) {
      navigate("/activites", { replace: true });
      return;
    }
    void attach(activityId, initialActivity);
  }, [activityId, attach, initialActivity, navigate]);

  async function handleConfirmFinish(data: {
    name: string;
    terrainType: TerrainType;
  }) {
    const success = await finish(data);
    if (success) navigate("/activites", { replace: true });
  }

  async function handleConfirmDelete() {
    const success = await remove();
    if (success) navigate("/activites", { replace: true });
  }

  if (!Number.isFinite(activityId)) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-michelin-blue border-t-transparent" />
          <p className="text-sm text-neutral-500">Chargement…</p>
        </div>
      </div>
    );
  }

  const isRecording = phase === "recording";
  const isPreparing = phase === "preparing";
  const isPaused = phase === "paused";

  return (
    <div className="flex min-h-[calc(100dvh-140px)] flex-col bg-app-bg">

      {/* ── Header ── */}
      <div className="px-4 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/activites")}
            className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-800"
            aria-label="Quitter l'écran (l'enregistrement continue)"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

          {/* Badge état */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
              isRecording
                ? "bg-michelin-green/15 text-michelin-green"
                : isPaused
                  ? "bg-amber-100 text-amber-600"
                  : "bg-neutral-100 text-neutral-500"
            }`}
          >
            {isRecording && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-michelin-green" />
            )}
            {isRecording ? "En cours" : isPaused ? "En pause" : "Prêt"}
          </span>
        </div>

        {/* Nom + terrain */}
        <div className="mt-3">
          <h1 className="text-xl font-black leading-tight text-neutral-900">
            {activityName}
          </h1>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-neutral-400">
            <MapPin size={12} />
            {formatTerrain(activityTerrainType)}
          </span>
        </div>
      </div>

      {/* ── Zone centrale ── */}
      <main className="flex flex-1 flex-col justify-between px-5 py-4">

        {/* Chrono + vitesse hero */}
        <div className="flex flex-col items-center py-6">
          {/* Chrono */}
          <span className="tabular-nums text-5xl font-black tracking-tighter text-neutral-900">
            {formatElapsedTime(elapsedSeconds)}
          </span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Durée
          </span>

          {/* Vitesse — héros */}
          <div className="mt-8 flex flex-col items-center">
            <span
              className={`tabular-nums text-[88px] font-black leading-none tracking-tighter transition-colors duration-500 ${
                isRecording ? "text-michelin-green" : "text-neutral-300"
              }`}
            >
              {formatSpeedKmh(metrics.speedKmh)}
            </span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-widest text-neutral-400">
              km/h
            </span>
          </div>
        </div>

        {/* Tiles stats secondaires */}
        <div className="grid grid-cols-3 gap-2.5">
          <StatTile
            icon={<MapPin size={16} />}
            value={formatDistanceKm(metrics.distanceKm)}
            label="km"
          />
          <StatTile
            icon={<TrendingUp size={16} />}
            value={formatElevationMeters(metrics.elevationGainM)}
            label="D+ (m)"
          />
          <StatTile
            icon={<Mountain size={16} />}
            value={formatElevationMeters(metrics.currentElevationM)}
            label="Alt (m)"
          />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </main>

      {/* ── Footer actions ── */}
      <div className="border-t border-neutral-100 bg-white px-5 pb-6 pt-4">
        {isPreparing && (
          <button
            type="button"
            onClick={start}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-michelin-green py-4 text-base font-bold text-white shadow-lg shadow-michelin-green/30 transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
          >
            <Play size={22} fill="white" />
            Démarrer la sortie
          </button>
        )}

        {isRecording && (
          <button
            type="button"
            onClick={pause}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-michelin-blue py-4 text-base font-bold text-white shadow-md transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
          >
            <Pause size={22} fill="white" />
            Pause
          </button>
        )}

        {isPaused && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={resume}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-2xl bg-michelin-green py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
              >
                <Play size={18} fill="white" />
                Reprendre
              </button>
              <button
                type="button"
                onClick={() => setShowFinishModal(true)}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-michelin-blue bg-white py-3.5 text-sm font-bold text-michelin-blue transition hover:bg-michelin-blue-light-01/40 active:scale-[0.98] disabled:opacity-60"
              >
                <Timer size={18} />
                Terminer
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-red-400 transition hover:text-red-600 disabled:opacity-60"
            >
              <Trash2 size={16} />
              Abandonner la sortie
            </button>
          </div>
        )}
      </div>

      <ConfirmActivityDeleteModal
        isOpen={showDeleteModal}
        isSubmitting={isSubmitting}
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => !isSubmitting && setShowDeleteModal(false)}
      />
      <FinishActivityModal
        isOpen={showFinishModal}
        isSubmitting={isSubmitting}
        defaultName={activityName}
        defaultTerrainType={activityTerrainType}
        onSubmit={handleConfirmFinish}
        onCancel={() => !isSubmitting && setShowFinishModal(false)}
      />
    </div>
  );
}
