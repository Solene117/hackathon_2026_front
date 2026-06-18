type UpcomingEventCardProps = {
  title: string;
  location: string;
  daysRemaining: number;
};

export default function UpcomingEventCard({
  title,
  location,
  daysRemaining,
}: UpcomingEventCardProps) {
  return (
    <section className="rounded-xl border border-neutral-300 bg-white p-5">
      <h2 className="mb-4 text-xl font-bold">
        Prochain événement
      </h2>

      <div className="rounded-xl bg-[#D4E7FA] p-4">
        <h3 className="font-bold text-[#27509B]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-neutral-700">
          📍 {location}
        </p>

        <p className="mt-3 text-sm font-semibold text-[#27509B]">
          Dans {daysRemaining} jours
        </p>
      </div>
    </section>
  );
}