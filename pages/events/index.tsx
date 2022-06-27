import * as React from "react";
import type { NextPage } from "next";

import { getAllEvents } from "data/dummy-data";
import EventSearch from "components/events/EventSearch";
import EventList from "components/events/EventList";

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();

  return (
    <React.Fragment>
      <EventSearch />
      <EventList events={events} />
    </React.Fragment>
  );
};

export default AllEventsPage;
