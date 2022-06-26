import Button from "components/Button";
import Image from "next/image";
import { FiCalendar, FiHome, FiArrowRight } from "react-icons/fi";

const EventItem = ({
  id,
  title,
  date,
  location,
  image,
}: {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section>
      <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <Image
                src={`/${image}`}
                alt={title}
                layout="fill"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>

              <time className="mt-4 text-gray-600 flex items-center">
                <FiCalendar className="inline-block mr-1" />
                {formattedDate}
              </time>

              <address className="mt-4 text-gray-600 flex items-center">
                <FiHome className="inline-block mr-1" />
                {location}
              </address>

              <Button link={`/events/${id}`}>
                <span className="text-sm font-medium">Explore Event</span>
                <FiArrowRight className="inline-block mx-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventItem;
