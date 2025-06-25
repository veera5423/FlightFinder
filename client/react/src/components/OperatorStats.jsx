import useOperatorStore from "../store/useOperatorStore";

const OperatorStats = () => {
  const { flights } = useOperatorStore();

  const totalFlights = flights.length;
  const totalSeats = flights.reduce((sum, f) => sum + f.totalSeats, 0);
  const availableSeats = flights.reduce((sum, f) => sum + f.availableSeats, 0);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Flights</h2>
        <p className="text-2xl text-orange-500 font-bold">{totalFlights}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Available Seats</h2>
        <p className="text-2xl text-blue-500 font-bold">{availableSeats}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Seats</h2>
        <p className="text-2xl text-green-600 font-bold">{totalSeats}</p>
      </div>
    </div>
  );
};

export default OperatorStats;
