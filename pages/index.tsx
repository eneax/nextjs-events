import * as React from "react";
import Head from "next/head";
import type { NextPage } from "next";

import { getFeaturedEvents } from "data/dummy-data";
import EventList from "components/events/EventList";

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EventList events={featuredEvents} />
    </React.Fragment>
  );
};

export default Home;
