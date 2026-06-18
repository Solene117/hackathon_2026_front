import PageShell from "../../components/layout/PageShell";
import EventCard from "../../components/community/EventCard";
import EventsHero from "../../components/community/EventsHero";
import { useEvents } from "../../hooks/useEvents";
import { useState } from "react";
import EventConfirmModal from "../../components/community/EventConfirmModal";
import type { Event } from "../../types/events";

export default function EvenementsPage() {
  const { events, registrations, loading, participate } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (loading) {
    return (
      <PageShell title="Événements" mainClassName="p-5 pb-24">
        <p>Chargement...</p>
      </PageShell>
    );
  }

  return (
    <PageShell title="Événements" mainClassName="p-5 pb-24">
      {selectedEvent && (
        <EventConfirmModal
          eventTitle={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
          onConfirm={() => {
            void participate(selectedEvent.id);
            setSelectedEvent(null);
          }}
        />
      )}
      <EventsHero />

      <div className="mt-6 space-y-5">
        {events.map((event) => {
          const isRegistered = registrations.some(
            (registration) => registration.eventId === event.id,
          );

          return (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                title: event.title,
                type: event.type,
                date: new Date(event.date).toLocaleDateString("fr-FR"),
                location: event.location,
                participants: event.participants,
                image: event.imageUrl ?? "/images/event-michelin.webp",
              }}
              isRegistered={isRegistered}
              onParticipate={() => setSelectedEvent(event)}
            />
          );
        })}
      </div>
    </PageShell>
  );
}
