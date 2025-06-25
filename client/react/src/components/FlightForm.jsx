import { useState } from "react";
import useOperatorStore from "../store/useOperatorStore";

const FlightForm = () => {
  const { addFlight } = useOperatorStore();

  const [airlineName, setAirlineName] = useState(""); // 👈 Airline stays persistent

  const defaultForm = {
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    duration: "",
    direct: true,
    classType: "economy",
    totalSeats: "",
    availableSeats: "",
  };

  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "airline") {
      setAirlineName(value); // 👈 handled separately
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedForm = {
      ...form,
      airline: airlineName, // 👈 merged before sending
      price: Number(form.price),
      totalSeats: Number(form.totalSeats),
      availableSeats: Number(form.availableSeats),
    };

    addFlight(formattedForm);
    setForm(defaultForm); // reset everything EXCEPT airline
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded-lg mb-6"
    >
      {/* Airline field (not inside Object.keys loop) */}
      <input
        name="airline"
        type="text"
        value={airlineName}
        onChange={handleChange}
        placeholder="Airline"
        className="border p-2 rounded col-span-2"
        required
      />

      {/* Dynamic fields (everything else) */}
      {Object.keys(form).map((key) =>
        key === "direct" ? (
          <label key={key} className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="direct"
              checked={form.direct}
              onChange={handleChange}
            />
            Direct Flight?
          </label>
        ) : (
          <input
            key={key}
            name={key}
            type={
              key.includes("Time")
                ? "datetime-local"
                : key === "price" || key.includes("Seats")
                ? "number"
                : "text"
            }
            value={form[key]}
            placeholder={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        )
      )}

      <button
        type="submit"
        className="col-span-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        Add Flight
      </button>
    </form>
  );
};

export default FlightForm;
