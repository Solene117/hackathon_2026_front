import { MapPin, Phone, Navigation, ExternalLink } from "lucide-react";
import type { Retail } from "../../types/retail";

type RetailerCardProps = {
  retail: Retail;
};

function openMaps(retail: Retail) {
  if (retail.latitude != null && retail.longitude != null) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${retail.latitude},${retail.longitude}`,
      "_blank",
      "noopener,noreferrer",
    );
    return;
  }

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(retail.address)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function RetailerCard({ retail }: RetailerCardProps) {
  const hasWebsite = Boolean(retail.websiteUrl);
  const hasPhone = Boolean(retail.phoneNumber);

  return (
    <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-neutral-900">{retail.name}</h2>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-start gap-2">
          <MapPin size={14} className="mt-0.5 shrink-0 text-neutral-400" />
          <p className="text-sm text-neutral-600 leading-snug">{retail.address}</p>
        </div>
        {hasPhone && (
          <div className="flex items-center gap-2">
            <Phone size={14} className="shrink-0 text-neutral-400" />
            <p className="text-sm text-neutral-600">{retail.phoneNumber}</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {/* CTA principal — vert Michelin */}
        <button
          type="button"
          onClick={() => openMaps(retail)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-michelin-green px-4 py-3 text-sm font-bold text-white shadow-sm shadow-green-200/60 transition hover:opacity-90 active:scale-[0.98]"
        >
          <Navigation size={15} />
          Voir l'itinéraire
        </button>

        {hasWebsite && (
          <a
            href={retail.websiteUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98]"
          >
            <ExternalLink size={15} />
            Visiter le site
          </a>
        )}
      </div>
    </section>
  );
}
