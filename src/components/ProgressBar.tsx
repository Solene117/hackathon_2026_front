type MichelinProgressBarProps = {
  value: number;
  showValue?: boolean;
};

export default function MichelinProgressBar({
  value,
  showValue = true,
}: MichelinProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-2 rounded-full bg-[#27509B] shadow-[0_0_8px_rgba(39,80,155,0.4)]"
          style={{ width: `${value}%` }}
        />
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-[#27509B]">
          %
        </span>
      )}
    </div>
  );
}