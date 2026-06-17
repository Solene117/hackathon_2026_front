import { useState } from "react";
import { getStravaConnectUrl } from "../api/auth";
import { getApiErrorMessage } from "../lib/errors";

type StravaConnectButtonProps = {
  className?: string;
  label?: string;
};

export default function StravaConnectButton({
  className = "w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white disabled:opacity-60",
  label = "Connecter Strava",
}: StravaConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    setError(null);
    setIsConnecting(true);

    try {
      const { authorizationUrl } = await getStravaConnectUrl();
      window.location.href = authorizationUrl;
    } catch (err) {
      setError(getApiErrorMessage(err));
      setIsConnecting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void handleConnect()}
        disabled={isConnecting}
        className={className}
      >
        {isConnecting ? "Redirection Strava..." : label}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
