import { ShieldCheck, Zap, Leaf, Wrench } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    label: "Sécurité",
    description: "Adhérence optimale sur tous les terrains",
    accent: "text-michelin-blue",
    bg: "bg-michelin-blue/8",
    iconBg: "bg-michelin-blue/12",
  },
  {
    icon: Zap,
    label: "Performance",
    description: "Rendement maximum à chaque sortie",
    accent: "text-michelin-yellow",
    bg: "bg-michelin-yellow/8",
    iconBg: "bg-michelin-yellow/15",
  },
  {
    icon: Leaf,
    label: "Durabilité",
    description: "Des pneus qui durent plus longtemps",
    accent: "text-michelin-green",
    bg: "bg-michelin-green/8",
    iconBg: "bg-michelin-green/12",
  },
  {
    icon: Wrench,
    label: "Entretien",
    description: "Alertes et suivi de l'usure en temps réel",
    accent: "text-neutral-500",
    bg: "bg-neutral-50",
    iconBg: "bg-neutral-200/60",
  },
];

export default function HomeBenefits() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-bold text-neutral-900">Vos bénéfices</h2>

      <div className="grid grid-cols-2 gap-3">
        {BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className={`rounded-2xl border border-neutral-100 ${b.bg} p-4`}
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${b.iconBg}`}>
                <Icon size={18} className={b.accent} />
              </div>
              <p className={`text-sm font-bold ${b.accent}`}>{b.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-neutral-500">
                {b.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
