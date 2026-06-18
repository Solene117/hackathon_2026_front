import PageShell from "../../components/layout/PageShell";
import EventCard, { type EventItem } from "../../components/community/EventCard";
import EventsHero from "../../components/community/EventsHero";

const events: EventItem[] = [
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

export default function EvenementsPage() {
  return (
    <PageShell title="Événements" mainClassName="p-5 pb-24">
      <EventsHero />

      <div className="mt-6 space-y-5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageShell>
  );
}
