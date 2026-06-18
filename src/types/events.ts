export type Event = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  imageUrl?: string;
};

export type EventRegistration = {
  id: number;
  userId: number;
  eventId: string;
  createdAt: string;
  event: Event;
};