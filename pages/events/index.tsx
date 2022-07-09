import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { InferGetStaticPropsType } from "next";

import { getAllEvents } from "utils/api";
import EventSearch from "components/events/EventSearch";
import EventList from "components/events/EventList";
import Header from "components/Header";

const AllEventsPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const searchEvents = (year: string, month: string) =>
    router.push(`/events/${year}/${month}`);

  return (
    <React.Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Browse all the events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header heading="All Events" />
      <EventSearch onSearch={searchEvents} />
      <EventList events={events} />
    </React.Fragment>
  );
};

export default AllEventsPage;

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};
