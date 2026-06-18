import { MapPin, Phone, Store } from "lucide-react";
import { formatDistance } from "../../lib/dealer-geo";
import type { DealerWithDistance } from "../../lib/dealer-geo";

type DealerListProps = {
  dealers: DealerWithDistance[];
  showDistance?: boolean;
};

export default function DealerList({
  dealers,
  showDistance = false,
}: DealerListProps) {
  return (
    <ul className="space-y-3">
      {dealers.map((dealer) => (
        <li
          key={dealer.id}
          className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-michelin-blue-light-01 text-michelin-blue">
              <Store size={16} aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-neutral-900">{dealer.name}</h3>
                {showDistance && (
                  <span className="shrink-0 rounded-full bg-michelin-blue-light-01 px-2 py-0.5 text-xs font-semibold text-michelin-blue">
                    {formatDistance(dealer.distanceMeters)}
                  </span>
                )}
              </div>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-neutral-400"
                    aria-hidden
                  />
                  <p className="text-sm leading-snug text-neutral-600">
                    {dealer.address}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-neutral-400" aria-hidden />
                  <a
                    href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                    className="text-sm text-michelin-blue hover:underline"
                  >
                    {dealer.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
