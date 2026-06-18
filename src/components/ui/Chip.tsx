type ChipProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Chip({
  children,
  className = "rounded-full bg-[#D4E7FA] px-3 py-1.5 text-xs font-medium text-[#27509B]",
}: ChipProps) {
  return <span className={className}>{children}</span>;
}
