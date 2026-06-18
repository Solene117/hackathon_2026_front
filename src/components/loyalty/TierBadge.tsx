import { Award } from "lucide-react";
import { getTier } from "../../lib/loyalty";

type TierBadgeProps = {
  tierName: string;
  size?: "sm" | "md";
};

export default function TierBadge({ tierName, size = "md" }: TierBadgeProps) {
  const tier = getTier(tierName);
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold text-white ${
        isSmall ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{ backgroundColor: tier.color }}
    >
      <Award size={isSmall ? 13 : 16} />
      {tier.label}
    </span>
  );
}
