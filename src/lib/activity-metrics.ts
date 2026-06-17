const EARTH_RADIUS_METERS = 6_371_000;

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const latitudeA = degreesToRadians(lat1);
  const latitudeB = degreesToRadians(lat2);
  const latitudeDelta = degreesToRadians(lat2 - lat1);
  const longitudeDelta = degreesToRadians(lon2 - lon1);

  const haversine =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return EARTH_RADIUS_METERS * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function metersPerSecondToKmh(speed: number | null | undefined): number {
  if (speed == null || speed < 0) return 0;
  return speed * 3.6;
}

export function formatElapsedTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function formatSpeedKmh(speed: number): string {
  return speed.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatDistanceKm(distanceKm: number): string {
  return distanceKm.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatElevationMeters(elevation: number): string {
  return Math.round(elevation).toLocaleString("fr-FR");
}
