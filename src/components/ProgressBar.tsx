type MichelinProgressBarProps = {
  value: number;
};

export default function MichelinProgressBar({
  value,
}: MichelinProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-white shadow-md">
        <div
          className="h-2 rounded-full bg-[#27509B] shadow-[0_0_8px_rgba(39,80,155,0.4)]"
          style={{ width: `${value}%` }}
        />
      </div>

      <span className="font-semibold text-[#27509B]">
        {value}%
      </span>
    </div>
  );
}