import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightSearchForm = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departureDate: "",
    travelClass: "economy",
    direct: false,
    passengers: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.from || !form.to || !form.departureDate) {
      alert("Please fill all required fields");
      return;
    }

    const query = new URLSearchParams({
      from: form.from,
      to: form.to,
      date: form.departureDate,
      class: form.travelClass,
      direct: form.direct,
      passengers: form.passengers,
    }).toString();

    localStorage.setItem("flightSearch", JSON.stringify(form));
    navigate(`/flights?${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow mb-6"
    >
      <input
        type="text"
        name="from"
        placeholder="From"
        value={form.from}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="to"
        placeholder="To"
        value={form.to}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="date"
        name="departureDate"
        value={form.departureDate}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <select
        name="travelClass"
        value={form.travelClass}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <input
        type="number"
        name="passengers"
        value={form.passengers}
        onChange={handleChange}
        min="1"
        max="9"
        className="p-2 border rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="direct"
          checked={form.direct}
          onChange={handleChange}
        />
        Direct Flights Only
      </label>

      <button
        type="submit"
        className="col-span-1 md:col-span-3 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
        Search Flights
      </button>
    </form>
  );
};

export default FlightSearchForm;
