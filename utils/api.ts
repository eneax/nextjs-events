export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${process.env.API_URL}/events.json`);
  const data = await response.json();

  // Convert the object data into an array of events
  const events = [];
  for (const key in data) {
    events.push({
      ...data[key],
      id: key,
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};
