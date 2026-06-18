import type { ReactNode, ElementType, MouseEvent } from "react";

type CardVariant = "default" | "flat" | "ghost" | "accent";
type CardAccent = "green" | "blue" | "yellow" | "purple";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  as?: ElementType;
  variant?: CardVariant;
  accent?: CardAccent;
  padding?: string;
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-neutral-100 shadow-sm",
  flat: "bg-neutral-50 border border-neutral-100",
  ghost: "bg-transparent border border-neutral-200",
  accent: "",
};

const accentClasses: Record<CardAccent, string> = {
  green: "bg-michelin-green/8 border border-michelin-green/20",
  blue: "bg-michelin-blue/8 border border-michelin-blue/20",
  yellow: "bg-michelin-yellow/20 border border-michelin-yellow/50",
  purple: "bg-michelin-purple/8 border border-michelin-purple/20",
};

export default function Card({
  children,
  className = "",
  onClick,
  as: Tag = "div",
  variant = "default",
  accent,
  padding = "p-5",
}: CardProps) {
  const base = accent ? accentClasses[accent] : variantClasses[variant];
  const interactive = onClick
    ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] active:translate-y-0"
    : "";

  return (
    <Tag
      onClick={onClick}
      className={`rounded-2xl ${padding} ${base} ${interactive} ${className}`}
    >
      {children}
    </Tag>
  );
}
