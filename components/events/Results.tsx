import Button from "components/Button";

const Results = ({ date }: { date: Date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto my-8 w-11/12 max-w-2xl text-center">
      <h1 className="text-4xl font-bold sm:text-6xl mb-8">
        Events in {formattedDate}
      </h1>

      <Button link="/events">Show all events</Button>
    </section>
  );
};

export default Results;
