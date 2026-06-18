import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  /** Icône SVG ou composant React à afficher dans la pastille */
  icon?: ReactNode;
};

/**
 * En-tête de section uniforme : pastille icône + titre + sous-titre optionnel.
 * À utiliser en haut du contenu de page (dans <main>), pas dans le header.
 */
export default function SectionHeader({ title, subtitle, icon }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      {icon && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-100 bg-white shadow-sm">
          {icon}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
