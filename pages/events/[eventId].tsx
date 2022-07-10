import * as React from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { FiCalendar, FiHome } from "react-icons/fi";
import Image from "next/image";

import { getEventById, getFeaturedEvents } from "utils/api";
import Comments from "components/comments/Comments";
import Header from "components/Header";

const EventDetailsPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <React.Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={`Learn more about the ${event.title} event`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header heading={event.title} />

      <section className="max-w-screen-md px-4 py-8 mx-auto text-center lg:py-16">
        <div className="block">
          <div className="mx-auto w-full h-72 relative">
            <Image
              src={`/${event.image}`}
              alt={event.title}
              layout="fill"
              placeholder="blur"
              blurDataURL={`/${event.image}`}
              className="object-cover rounded-bl-3xl rounded-tr-3xl"
            />
          </div>

          <div className="flex items-center justify-center flex-col md:flex-row mt-4 space-x-4">
            <time className="font-medium flex items-center mb-1">
              <FiCalendar className="inline-block mr-1" />
              {formattedDate}
            </time>

            <span className="w-8 h-px bg-yellow-500 hidden md:block"></span>

            <address className="opacity-50 flex items-center mb-1">
              <FiHome className="inline-block mr-1" />
              {event.location}
            </address>
          </div>
        </div>

        <p className="max-w-lg mx-auto my-4 text-sm text-gray-500">
          {event.description}
        </p>

        <Comments eventId={event.id} />
      </section>
    </React.Fragment>
  );
};

export default EventDetailsPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as { eventId: string };
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
