// src/pages/Flights.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FlightSearchForm from "../components/FlightSearchForm";
import PaymentSection from "./PaymentSection";

function Flights() {
  const location = useLocation();
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  // For now, we simulate results (replace this with real backend data)
  useEffect(() => {
    const fetchFlights = async () => {
      const params = new URLSearchParams(location.search);
      const from = params.get("from");
      const to = params.get("to");
      const date = params.get("date");
      const travelClass = params.get("class");
      const direct = params.get("direct");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/flights/search`,
          {
            params: { from, to, date, class: travelClass, direct },
          }
        );
        setFlights(res.data);
      } catch (err) {
        console.error("Failed to fetch flights:", err.message);
      }
    };

    fetchFlights();
  }, [location.search]);

  return (
    <>
      <FlightSearchForm />

      <div className="min-h-screen px-4 py-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Available Flights
        </h1>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{flight.airline}</h2>
                  <p className="text-sm text-gray-600">
                    {flight.from} → {flight.to}
                  </p>
                  <p className="text-sm">
                    {flight.time} • {flight.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    ${flight.price}
                  </p>
                  <p className="text-sm">
                    {flight.direct ? "Direct" : "1 Stop"}
                  </p>
                </div>
              </div>
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                onClick={() => navigate("/payment", { state: { flight } })}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* {selectedFlight && <PaymentSection amount={selectedFlight.price} />} */}
    </>
  );
}

export default Flights;
