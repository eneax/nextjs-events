import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import { getFilteredEvents } from "data/dummy-data";
import EventList from "components/events/EventList";
import Results from "components/events/Results";
import Empty from "components/Empty";
import Loading from "components/Loading";

const FilteredEventsPage: NextPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <Loading />;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return <Empty header="Invalid filter." text="Please adjust your values." />;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Empty header="No events found." text="Please select a different date." />
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <React.Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content="Browse all the events for a specific date"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Results date={date} />
      <EventList events={filteredEvents} />
    </React.Fragment>
  );
};

export default FilteredEventsPage;
