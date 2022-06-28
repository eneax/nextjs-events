import * as React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import { getFilteredEvents } from "data/dummy-data";
import EventList from "components/events/EventList";
import Results from "components/events/Results";
import Empty from "components/Empty";

const FilteredEventsPage: NextPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p>Loading...</p>;
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
      <Results date={date} />
      <EventList events={filteredEvents} />
    </React.Fragment>
  );
};

export default FilteredEventsPage;
