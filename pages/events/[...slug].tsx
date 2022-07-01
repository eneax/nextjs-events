import * as React from "react";
import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { getFilteredEvents } from "utils/api";
import EventList from "components/events/EventList";
import Results from "components/events/Results";
import Empty from "components/Empty";

const FilteredEventsPage = ({
  filteredEvents,
  date,
  hasError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (hasError) {
    return <Empty header="Invalid filter." text="Please adjust your values." />;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Empty header="No events found." text="Please select a different date." />
    );
  }

  const resultsDate = new Date(date.year, date.month - 1);

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

      <Results date={resultsDate} />
      <EventList events={filteredEvents} />
    </React.Fragment>
  );
};

export default FilteredEventsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredData = context.params.slug;

  if (!filteredData) {
    return {
      props: {
        hasError: true,
      },
    };
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
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/custom-error-page",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
      hasError: false,
    },
  };
};
