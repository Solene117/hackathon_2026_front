import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyFieldProps = {
  label?: string;
  value: string;
};

export default function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponible (contexte non sécurisé) */
    }
  }

  return (
    <div>
      {label && (
        <span className="mb-1 block text-xs font-semibold text-neutral-500">
          {label}
        </span>
      )}
      <div className="flex items-stretch gap-2">
        <span className="flex-1 truncate rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-2.5 text-sm font-medium text-neutral-800">
          {value}
        </span>
        <button
          type="button"
          onClick={() => void handleCopy()}
          aria-label="Copier"
          className="flex items-center gap-1.5 rounded-lg bg-[#27509B] px-3 py-2.5 text-sm font-bold text-white hover:bg-[#1a3d7a]"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
    </div>
  );
}
