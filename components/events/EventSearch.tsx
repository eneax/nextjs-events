import Button from "components/Button";

const EventSearch = () => {
  return (
    <form className="my-8 mx-auto p-4 bg-white w-11/12 max-w-2xl flex flex-col md:flex-row justify-between gap-4 shadow rounded-md">
      <div className="flex flex-col gap-4 w-full md:w-4/5 md:flex-row mx-auto">
        <div className="flex items-center justify-between gap-4 flex-1">
          <label htmlFor="year" className="font-bold">
            Year
          </label>
          <select
            id="year"
            className="bg-white w-8/12 p-1 rounded-md border md:w-full"
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-4 flex-1">
          <label htmlFor="month" className="font-bold">
            Month
          </label>
          <select
            id="month"
            className="bg-white w-8/12 p-1 rounded-md border md:w-full"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <Button>Find Events</Button>
      </div>
    </form>
  );
};

export default EventSearch;
