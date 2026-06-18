import Header from "../components/Header";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Sortie Gravel Michelin",
    type: "Ride communautaire",
    date: "22 Juin 2026",
    location: "Annecy",
    participants: 48,
    image: "src/assets/event-michelin.webp",
  },
  {
    id: 2,
    title: "Challenge 300 km",
    type: "Challenge connecté",
    date: "1 - 31 Juillet 2026",
    location: "Lyon",
    participants: 312,
    image: "src/assets/event-michelin.webp",
  },
  {
    id: 3,
    title: "Atelier Entretien Pneus",
    type: "Atelier partenaire",
    date: "12 Juillet 2026",
    location: "Décathlon Annecy",
    participants: 25,
    image: "src/assets/event-michelin.webp",
  },
];

export default function Evenements() {
  return (
    <div>
      <Header title="Événements" />

      <main className="p-5 pb-24">
        <div className="overflow-hidden rounded-2xl bg-[#27509B] text-white">
          <div className="p-6">
            <h1 className="text-3xl font-bold">
              Roulez avec la communauté Michelin
            </h1>

            <p className="mt-3 text-sm text-blue-100">
              Participez à des sorties, challenges et événements organisés
              avec nos partenaires.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {events.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm"
            >
              <div className="h-40 bg-neutral-100">
                <img
                  src={event.image}
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
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}