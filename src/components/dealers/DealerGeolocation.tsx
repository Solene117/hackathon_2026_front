import { Loader2, MapPin, Navigation, X } from "lucide-react";
import { useState } from "react";
import type { LocationPoint } from "../../lib/dealer-geo";
import ErrorAlert from "../ui/ErrorAlert";

type DealerGeolocationProps = {
  userLocation: LocationPoint | null;
  onUserLocationChange: (location: LocationPoint | null) => void;
};

function getGeolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Autorisez l'accès à votre position pour utiliser la géolocalisation.";
    case error.POSITION_UNAVAILABLE:
      return "Votre position n'a pas pu être déterminée.";
    case error.TIMEOUT:
      return "La géolocalisation a expiré. Réessayez.";
    default:
      return "Impossible d'obtenir votre position.";
  }
}

export default function DealerGeolocation({
  userLocation,
  onUserLocationChange,
}: DealerGeolocationProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas disponible sur cet appareil.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onUserLocationChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: "Ma position",
        });
        setIsLocating(false);
      },
      (geoError) => {
        setError(getGeolocationErrorMessage(geoError));
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 60_000,
      },
    );
  }

  function handleClearLocation() {
    onUserLocationChange(null);
    setError(null);
  }

  return (
    <div className="space-y-3">
      {!userLocation && (
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-michelin-blue bg-white px-3 py-2.5 text-sm font-semibold text-michelin-blue transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLocating ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <Navigation size={16} aria-hidden />
          )}
          Ma position
        </button>
      )}

      {userLocation && (
        <div className="flex items-start gap-2 rounded-lg border border-michelin-blue-light-03 bg-michelin-blue-light-01 px-3 py-2 text-sm text-michelin-blue">
          <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
          <p className="min-w-0 flex-1 leading-snug">
            <span className="font-semibold">Position :</span> {userLocation.label}
          </p>
          <button
            type="button"
            onClick={handleClearLocation}
            className="shrink-0 rounded p-0.5 text-michelin-blue hover:bg-white/60"
            aria-label="Effacer la localisation"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <ErrorAlert message={error} />}
    </div>
  );
}
