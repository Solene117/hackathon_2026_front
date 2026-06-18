import type { ReactNode } from "react";

type StatCardAccent = "green" | "blue" | "yellow" | "neutral";

type StatCardProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: StatCardAccent;
  variant?: "default" | "highlight";
};

const accentMap: Record<StatCardAccent, { dot: string; value: string; bg: string; border: string }> = {
  green: {
    dot: "bg-michelin-green",
    value: "text-michelin-green",
    bg: "bg-michelin-green/8",
    border: "border-michelin-green/20",
  },
  blue: {
    dot: "bg-michelin-blue",
    value: "text-michelin-blue",
    bg: "bg-michelin-blue/8",
    border: "border-michelin-blue/20",
  },
  yellow: {
    dot: "bg-michelin-yellow",
    value: "text-amber-600",
    bg: "bg-michelin-yellow/20",
    border: "border-michelin-yellow/50",
  },
  neutral: {
    dot: "bg-neutral-300",
    value: "text-neutral-900",
    bg: "bg-white",
    border: "border-neutral-100",
  },
};

export default function StatCard({
  label,
  value,
  icon,
  accent = "neutral",
  variant = "default",
}: StatCardProps) {
  const colors = accentMap[variant === "highlight" ? "green" : accent];

  return (
    <div className={`rounded-2xl border p-4 ${colors.bg} ${colors.border}`}>
      <div className="mb-2 flex items-center justify-between">
        {icon ? (
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${colors.bg}`}>
            <span className={colors.value}>{icon}</span>
          </div>
        ) : (
          <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
        )}
      </div>
      <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
      <p className="mt-1 text-xs font-medium text-neutral-500">{label}</p>
    </div>
  );
}
