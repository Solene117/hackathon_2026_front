type EventsHeroProps = {
  title?: string;
  description?: string;
};

export default function EventsHero({
  title = "Roulez avec la communauté Michelin",
  description = "Participez à des sorties, challenges et événements organisés avec nos partenaires.",
}: EventsHeroProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#27509B] text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-sm text-blue-100">{description}</p>
      </div>
    </div>
  );
}
