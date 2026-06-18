import InfluencerDashboard from "./InfluencerDashboard";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import { useInfluencerDashboard } from "../../hooks/useInfluencerDashboard";

export default function RecompensesInfluencerView() {
  const { dashboard, isLoading, error } = useInfluencerDashboard();

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!dashboard) return null;

  return <InfluencerDashboard dashboard={dashboard} />;
}
