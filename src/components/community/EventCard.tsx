import { Calendar, MapPin, Users } from "lucide-react";

export type EventItem = {
  id: number;
  title: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  image: string;
};

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm">
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

        <h2 className="mt-3 text-xl font-bold">{event.title}</h2>

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
  );
}
