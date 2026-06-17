import type { Retail } from "../types/retail";

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
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-xl font-bold">{retail.name}</h2>
      <p className="mt-3 text-sm text-neutral-700">{retail.address}</p>
      {hasPhone && (
        <p className="mt-1 text-sm text-neutral-700">{retail.phoneNumber}</p>
      )}

      <div className="mt-5 flex flex-col gap-2">
        {hasWebsite && (
          <a
            href={retail.websiteUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-[#27509B] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#00205B]"
          >
            Visiter le site
          </a>
        )}

        <button
          type="button"
          onClick={() => openMaps(retail)}
          className={`w-full rounded-lg px-4 py-3 text-sm font-bold ${
            hasWebsite
              ? "border border-[#27509B] bg-white text-[#27509B] hover:bg-neutral-100"
              : "bg-[#27509B] text-white hover:bg-[#00205B]"
          }`}
        >
          Voir l'itinéraire
        </button>
      </div>
    </section>
  );
}
