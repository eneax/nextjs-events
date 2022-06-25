import * as React from "react";
import type { NextPage } from "next";

import { getFeaturedEvents } from "data/dummy-data";
import EventList from "components/events/EventList";

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <React.Fragment>
      <EventList events={featuredEvents} />
    </React.Fragment>
  );
};

export default Home;
