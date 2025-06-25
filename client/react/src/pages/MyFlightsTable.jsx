import { useEffect, useState } from "react";
import useOperatorStore from "../store/useOperatorStore";
import dayjs from "dayjs";

const MyFlightsTable = () => {
  const { flights, fetchMyFlights, loading, deleteFlight } = useOperatorStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    fetchMyFlights();
  }, [fetchMyFlights]);

  if (loading) return <p>Loading your flights...</p>;

  if (!Array.isArray(flights)) return <p>Error loading flights.</p>;
  if (flights.length === 0) return <p>No flights added yet.</p>;
  const filteredFlights = flights.filter((flight) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      flight.flightNumber.toLowerCase().includes(term) ||
      flight.from.toLowerCase().includes(term) ||
      flight.to.toLowerCase().includes(term);

    const matchDate = filterDate
      ? dayjs(flight.departureTime).format("YYYY-MM-DD") === filterDate
      : true;

    const matchClass = filterClass ? flight.classType === filterClass : true;

    return matchSearch && matchDate && matchClass;
  });

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by flight number, from, or to"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Classes</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
      </div>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="p-2 border">Flight No.</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Departure</th>
            <th className="p-2 border">Arrival</th>
            <th className="p-2 border">Flight Type</th>
            <th className="p-2 border">Seats</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.map((flight) => (
            <tr key={flight._id} className="text-center">
              <td className="p-2 border">{flight.flightNumber}</td>
              <td className="p-2 border">{flight.from}</td>
              <td className="p-2 border">{flight.to}</td>
              <td className="p-2 border">
                {dayjs(flight.departureTime).format("DD MMM YYYY - hh:mm A")}
              </td>
              <td className="p-2 border">
                {dayjs(flight.arrivalTime).format("DD MMM YYYY - hh:mm A")}
              </td>
              <td className="p-2 border">
                {flight.direct ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Direct
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                    Connecting
                  </span>
                )}
              </td>
              <td className="p-2 border">
                {flight.availableSeats}/{flight.totalSeats}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteFlight(flight._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFlightsTable;
