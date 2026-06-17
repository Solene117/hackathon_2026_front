import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import ActivityDetailView from "./ActivityDetailView";
import ActivityRecording from "./ActivityRecording";

export default function ActivityPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);
  const { activity, isLoading, error } = useActivity(activityId);

  useEffect(() => {
    if (!Number.isFinite(activityId)) {
      navigate("/activites", { replace: true });
    }
  }, [activityId, navigate]);

  if (!Number.isFinite(activityId)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[430px] items-center justify-center bg-white">
        <p className="text-sm text-neutral-600">Chargement...</p>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center bg-white px-5">
        <p className="text-center text-sm text-red-600" role="alert">
          {error ?? "Activité introuvable"}
        </p>
        <button
          type="button"
          onClick={() => navigate("/activites")}
          className="mt-4 rounded-xl bg-[#27509B] px-4 py-3 text-sm font-semibold text-white"
        >
          Retour aux activités
        </button>
      </div>
    );
  }

  const isRecording =
    activity.status === "IN_PROGRESS" && activity.source === "APP_TRACKED";

  if (isRecording) {
    return <ActivityRecording initialActivity={activity} />;
  }

  return (
    <ActivityDetailView
      activity={activity}
      onBack={() => navigate("/activites")}
    />
  );
}
