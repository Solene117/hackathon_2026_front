type StatCardProps = {
  label: string;
  value: string;
  variant?: "default" | "highlight";
};

export default function StatCard({
  label,
  value,
  variant = "default",
}: StatCardProps) {
  if (variant === "highlight") {
    return (
      <div className="rounded-lg border border-neutral-300 bg-[#D4E7FA] p-3">
        <strong>{value}</strong>
        <p className="mt-1 text-xs text-neutral-600">{label}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-300 bg-white p-4 text-center">
      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </div>
  );
}
