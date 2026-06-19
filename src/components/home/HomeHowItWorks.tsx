import { ScanSearch, Lightbulb, MapPin } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Analysez votre pratique",
    description: "Enregistrez vos sorties vélo et suivez vos km en temps réel.",
    accent: "text-michelin-blue",
    bg: "bg-michelin-blue/8",
    border: "border-michelin-blue/15",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Recevez des recommandations",
    description: "Michelin analyse votre usage et vous conseille le pneu adapté.",
    accent: "text-michelin-yellow",
    bg: "bg-michelin-yellow/10",
    border: "border-michelin-yellow/20",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Trouvez un revendeur",
    description: "Localisez le partenaire Michelin le plus proche de vous.",
    accent: "text-michelin-green",
    bg: "bg-michelin-green/8",
    border: "border-michelin-green/15",
  },
];

export default function HomeHowItWorks() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-bold text-neutral-900">
        Comment ça marche ?
      </h2>

      <div className="space-y-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`flex items-start gap-4 rounded-2xl border ${step.border} ${step.bg} p-4`}
            >
              {/* Numéro + icône */}
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span className={`text-[10px] font-black tracking-widest ${step.accent} opacity-60`}>
                  {step.number}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm`}>
                  <Icon size={18} className={step.accent} />
                </div>
              </div>

              {/* Texte */}
              <div className="min-w-0 pt-1">
                <p className="font-bold text-neutral-900">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
