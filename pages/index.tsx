import * as React from "react";
import Head from "next/head";
import type { InferGetStaticPropsType } from "next";

import { getFeaturedEvents } from "utils/api";
import EventList from "components/events/EventList";
import Header from "components/Header";

const Home = ({
  featuredEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <React.Fragment>
    <Head>
      <title>Home</title>
      <meta name="description" content="Home" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header heading="Featured Events" />
    <EventList events={featuredEvents} />
  </React.Fragment>
);

export default Home;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};
