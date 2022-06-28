import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import { getAllEvents } from "data/dummy-data";
import EventSearch from "components/events/EventSearch";
import EventList from "components/events/EventList";

const AllEventsPage: NextPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const searchEvents = (year: string, month: string) =>
    router.push(`/events/${year}/${month}`);

  return (
    <React.Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Browse all the events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EventSearch onSearch={searchEvents} />
      <EventList events={events} />
    </React.Fragment>
  );
};

export default AllEventsPage;
