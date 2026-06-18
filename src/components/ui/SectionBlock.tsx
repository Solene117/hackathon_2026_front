import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type SectionBlockProps = {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    to: string;
  };
  children: ReactNode;
  className?: string;
  headerClassName?: string;
};

/**
 * Bloc de section dashboard : titre + action optionnelle + contenu.
 */
export default function SectionBlock({
  title,
  subtitle,
  action,
  children,
  className = "",
  headerClassName = "",
}: SectionBlockProps) {
  return (
    <section className={`rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm ${className}`}>
      <div className={`mb-4 flex items-start justify-between gap-3 ${headerClassName}`}>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
          )}
        </div>

        {action && (
          <Link
            to={action.to}
            className="shrink-0 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-michelin-green/10 hover:text-michelin-green"
          >
            {action.label}
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
