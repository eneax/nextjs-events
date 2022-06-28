import * as React from "react";

import type { Event } from "data/dummy-data";
import EventItem from "./EventItem";

const EventList = ({ events }: { events: Event[] }) => (
  <React.Fragment>
    {events.map((event) => (
      <EventItem
        key={event.id}
        id={event.id}
        title={event.title}
        location={event.location}
        date={event.date}
        image={event.image}
      />
    ))}
  </React.Fragment>
);

export default EventList;
