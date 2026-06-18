type GuideHeroProps = {
  title?: string;
  description?: string;
};

export default function GuideHero({
  title = "Guide du pneu",
  description = "Conseils Michelin pour choisir, entretenir et remplacer vos pneus.",
}: GuideHeroProps) {
  return (
    <section className="rounded-2xl bg-[#27509B] p-6 text-white">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-sm text-blue-100">{description}</p>
    </section>
  );
}
