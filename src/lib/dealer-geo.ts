import { haversineDistanceMeters } from "./activity-metrics";
import type { Dealer } from "../types/dealer";

export type LocationPoint = {
  latitude: number;
  longitude: number;
  label: string;
};

export type DealerWithDistance = Dealer & { distanceMeters: number };

export function sortDealersByDistance(
  dealers: Dealer[],
  origin: LocationPoint,
): DealerWithDistance[] {
  return dealers
    .map((dealer) => ({
      ...dealer,
      distanceMeters: haversineDistanceMeters(
        origin.latitude,
        origin.longitude,
        dealer.latitude,
        dealer.longitude,
      ),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}
