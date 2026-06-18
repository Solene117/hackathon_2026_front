import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LocationPoint } from "../../lib/dealer-geo";
import type { Dealer } from "../../types/dealer";

type DealerMapProps = {
  dealers: Dealer[];
  userLocation?: LocationPoint | null;
};

const DEFAULT_CENTER: [number, number] = [46.603354, 1.888334];
const DEFAULT_ZOOM = 6;

const storeMarkerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:36px;
      height:36px;
      border-radius:9999px;
      background:#27509B;
      color:white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      border:2px solid white;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
        <path d="M17.774 10.31a1.12 1.12 0 0 0-1.937 0l-4.172 7.113a1.12 1.12 0 0 1-1.937 0L5.556 10.31a1.12 1.12 0 0 1 1.937-1.124L12 14.584l4.507-5.398a1.12 1.12 0 0 1 1.937 1.124z"/>
        <path d="M3 7h18"/>
        <path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const userMarkerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:16px;
      height:16px;
      border-radius:9999px;
      background:#84BD00;
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8],
});

function MapBoundsUpdater({
  dealers,
  userLocation,
}: {
  dealers: Dealer[];
  userLocation?: LocationPoint | null;
}) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = dealers.map((dealer) => [
      dealer.latitude,
      dealer.longitude,
    ]);

    if (userLocation) {
      points.push([userLocation.latitude, userLocation.longitude]);
    }

    if (points.length === 0) return;

    if (points.length === 1) {
      map.setView(points[0], 14);
    } else {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
    }

    map.invalidateSize();
  }, [dealers, userLocation, map]);

  return null;
}

export default function DealerMap({ dealers, userLocation }: DealerMapProps) {
  const initialCenter: [number, number] = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : dealers.length > 0
      ? [dealers[0].latitude, dealers[0].longitude]
      : DEFAULT_CENTER;

  return (
    <div className="h-64 w-full overflow-hidden rounded-xl border border-neutral-200 sm:h-72">
      <MapContainer
        center={initialCenter}
        zoom={userLocation || dealers.length === 1 ? 12 : DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsUpdater dealers={dealers} userLocation={userLocation} />

        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userMarkerIcon}
          >
            <Popup>
              <p className="text-sm font-semibold text-neutral-900">
                {userLocation.label}
              </p>
            </Popup>
          </Marker>
        )}

        {dealers.map((dealer) => (
          <Marker
            key={dealer.id}
            position={[dealer.latitude, dealer.longitude]}
            icon={storeMarkerIcon}
          >
            <Popup>
              <div className="space-y-1 text-sm">
                <p className="font-bold text-neutral-900">{dealer.name}</p>
                <p className="text-neutral-600">{dealer.address}</p>
                <a
                  href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                  className="font-medium text-michelin-blue hover:underline"
                >
                  {dealer.phone}
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
