import { useMemo, useState } from "react";
import { useTyreDealers } from "../../hooks/useTyreDealers";
import {
  sortDealersByDistance,
  type DealerWithDistance,
  type LocationPoint,
} from "../../lib/dealer-geo";
import EmptyState from "../ui/EmptyState";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingMessage from "../ui/LoadingMessage";
import DealerGeolocation from "./DealerGeolocation";
import DealerList from "./DealerList";
import DealerMap from "./DealerMap";
import DealersViewToggle, { type DealersViewMode } from "./DealersViewToggle";

type TireDealersTabProps = {
  tireId: number;
};

export default function TireDealersTab({ tireId }: TireDealersTabProps) {
  const { dealers, isLoading, error } = useTyreDealers(tireId);
  const [viewMode, setViewMode] = useState<DealersViewMode>("list");
  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null);

  const displayedDealers = useMemo((): DealerWithDistance[] => {
    if (userLocation) {
      return sortDealersByDistance(dealers, userLocation);
    }

    return dealers.map((dealer) => ({ ...dealer, distanceMeters: 0 }));
  }, [dealers, userLocation]);

  return (
    <div className="mt-4 space-y-4">
      <DealerGeolocation
        userLocation={userLocation}
        onUserLocationChange={setUserLocation}
      />

      <DealersViewToggle mode={viewMode} onChange={setViewMode} />

      {isLoading && (
        <LoadingMessage
          message="Chargement des revendeurs…"
          className="py-6 text-center text-sm text-neutral-600"
        />
      )}

      {error && <ErrorAlert message={error} />}

      {!isLoading && !error && dealers.length === 0 && (
        <EmptyState
          message="Aucun revendeur disponible pour ce pneu."
          className="py-6 text-center text-sm text-neutral-600"
        />
      )}

      {!isLoading && !error && dealers.length > 0 && (
        <>
          {userLocation && (
            <p className="text-xs text-neutral-500">
              Revendeurs triés par distance depuis votre localisation.
            </p>
          )}

          {viewMode === "list" ? (
            <DealerList
              dealers={displayedDealers}
              showDistance={userLocation !== null}
            />
          ) : (
            <DealerMap dealers={displayedDealers} userLocation={userLocation} />
          )}
        </>
      )}
    </div>
  );
}
