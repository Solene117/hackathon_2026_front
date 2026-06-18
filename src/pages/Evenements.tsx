import Header from "../components/layout/Header";
import { Calendar, MapPin, Users } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

export default function Evenements() {
  const {
    events,
    registrations,
    loading,
    participate,
  } = useEvents();

  if (loading) {
    return (
      <div>
        <Header title="Événements" showBackButton />
        <main className="p-5">
          <p>Chargement...</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header title="Événements" showBackButton />

      <main className="p-5 pb-24">
        <section className="rounded-2xl bg-[#27509B] p-6 text-white">
          <h1 className="text-3xl font-bold">
            Roulez avec la communauté Michelin
          </h1>

          <p className="mt-3 text-sm text-blue-100">
            Participez à des sorties, challenges et événements organisés avec
            nos partenaires.
          </p>
        </section>

        <div className="mt-6 space-y-5">
          {events.map((event) => {
            const isRegistered = registrations.some(
              (registration) => registration.eventId === event.id
            );

            return (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm"
              >
                <div className="h-40 bg-neutral-100">
                  <img
                    src={
                      event.imageUrl ??
                      "/images/event-placeholder.jpg"
                    }
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-[#D4E7FA] px-3 py-1 text-xs font-medium text-[#27509B]">
                    {event.type}
                  </span>

                  <h2 className="mt-3 text-xl font-bold">
                    {event.title}
                  </h2>

                  <div className="mt-4 space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(event.date).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>
                        {event.participants} participants
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isRegistered}
                    onClick={() => void participate(event.id)}
                    className={`mt-5 w-full rounded-lg px-4 py-3 font-bold ${
                      isRegistered
                        ? "bg-neutral-200 text-neutral-500"
                        : "bg-[#27509B] text-white hover:bg-[#1a3d7a]"
                    }`}
                  >
                    {isRegistered ? "Inscrit" : "Participer"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}