import Button from "components/Button";

const Empty = ({ header, text }: { header: string; text: string }) => (
  <div className="w-96 my-8 mx-auto relative p-8 text-center border border-gray-200 rounded-lg">
    <h2 className="text-2xl font-medium">{header}</h2>

    <p className="mt-4 text-sm text-gray-500 mb-8">{text}</p>

    <Button link="/events">Show all events</Button>
  </div>
);

export default Empty;
