import * as React from "react";
import type { NextPage } from "next";

import { getAllEvents } from "data/dummy-data";
import EventList from "components/events/EventList";

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();

  return (
    <React.Fragment>
      <EventList events={events} />
    </React.Fragment>
  );
};

export default AllEventsPage;
