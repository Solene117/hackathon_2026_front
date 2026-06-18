import { Link, useLocation } from "react-router-dom";
import { Pause, Play } from "lucide-react";
import {
  formatDistanceKm,
  formatElapsedTime,
} from "../../lib/activity-metrics";
import { useRecordingStore } from "../../stores/recordingStore";

export default function RecordingMiniWidget() {
  const location = useLocation();
  const activityId = useRecordingStore((s) => s.activityId);
  const phase = useRecordingStore((s) => s.phase);
  const elapsedSeconds = useRecordingStore((s) => s.elapsedSeconds);
  const metrics = useRecordingStore((s) => s.metrics);

  if (activityId == null) return null;

  const recordingPath = `/activites/${activityId}`;
  if (location.pathname === recordingPath) return null;

  const isRecording = phase === "recording";
  const isPaused = phase === "paused";

  return (
    <Link
      to={recordingPath}
      className={`mx-4 mt-3 mb-1 flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-md transition active:scale-[0.98] ${
        isRecording
          ? "bg-michelin-green text-white"
          : isPaused
            ? "border border-amber-200 bg-amber-50 text-neutral-800"
            : "border border-michelin-blue/20 bg-michelin-blue-light-01 text-michelin-blue"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          isRecording
            ? "bg-white/20"
            : isPaused
              ? "bg-amber-100"
              : "bg-white/80"
        }`}
      >
        {isPaused ? (
          <Pause size={18} className="text-amber-600" />
        ) : (
          <Play size={18} className={isRecording ? "text-white" : "text-michelin-blue"} />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wide opacity-90">
          {isRecording ? "Sortie en cours" : isPaused ? "Sortie en pause" : "Prêt à partir"}
        </span>
        <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold tabular-nums">
          <span>{formatElapsedTime(elapsedSeconds)}</span>
          {(isRecording || isPaused) && (
            <>
              <span className="opacity-50">·</span>
              <span>{formatDistanceKm(metrics.distanceKm)} km</span>
            </>
          )}
        </span>
      </span>

      <span className="shrink-0 text-xs font-bold opacity-80">Ouvrir</span>
    </Link>
  );
}
