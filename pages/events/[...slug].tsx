import * as React from "react";
import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { getFilteredEvents } from "utils/api";
import EventList from "components/events/EventList";
import Empty from "components/Empty";
import Header from "components/Header";
import Button from "components/Button";

const FilteredEventsPage = ({
  filteredEvents,
  date,
  hasError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const resultsDate = new Date(date.year, date.month - 1);
  const formattedDate = new Date(resultsDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const MetaData = () => (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`Browse all the events for ${date.month}/${date.year}.`}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );

  if (hasError) {
    return (
      <React.Fragment>
        <MetaData />
        <Empty header="Invalid filter." text="Please adjust your values." />
      </React.Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
        <MetaData />
        <Header heading={`Events in ${formattedDate}`} />
        <Empty
          header="No events found."
          text="Please select a different date."
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <MetaData />

      <Header heading={`Events in ${formattedDate}`} />
      <div className="mx-auto my-4 w-11/12 max-w-2xl text-center">
        <Button link="/events">Show all events</Button>
      </div>

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
