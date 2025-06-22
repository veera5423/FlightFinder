// src/pages/Flights.jsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Flights() {
  const location = useLocation()
  const [flights, setFlights] = useState([])
  const [form, setForm] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travelClass: 'economy',
    passengers: 1,
  })
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleSearch = async (e) => {
    e.preventDefault()
  
    // Optional: validate inputs
    if (!form.from || !form.to || !form.departureDate) {
      alert('Please fill in the required fields')
      return
    }
  
    // Save form state (or send to zustand)
    localStorage.setItem('flightSearch', JSON.stringify(form))
  
    // Navigate to results page
    const query = new URLSearchParams({
      from: form.from,
      to: form.to,
      date: form.departureDate
    }).toString()
  
    navigate(`/flights?${query}`)
  }


  // For now, we simulate results (replace this with real backend data)
  useEffect(() => {
    const fetchFlights = async () => {
      const params = new URLSearchParams(location.search)
      const from = params.get('from')
      const to = params.get('to')
      const date = params.get('date')
  
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/flights/search`, {
          params: { from, to, date },
        })
        setFlights(res.data)
      } catch (err) {
        console.error('Failed to fetch flights:', err)
      }
    }
  
    fetchFlights()
  }, [location.search])

  return (



    <>
    <section id="search" className="py-12 bg-white px-4">
        <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Find Your Flight</h2>
          <form onSubmit={handleSearch} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="from" placeholder="From" value={form.from} onChange={handleChange} className="input" />
              <input type="text" name="to" placeholder="To" value={form.to} onChange={handleChange} className="input" />
              <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} className="input" />
              <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} className="input" />
              <select name="travelClass" value={form.travelClass} onChange={handleChange} className="input">
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
              <input type="number" name="passengers" value={form.passengers} onChange={handleChange} min="1" max="9" className="input" />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">Search</button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">Why Choose FlightFinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Fast & Easy Booking</h3>
            <p>Book your tickets in minutes with our optimized search and booking experience.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Trusted Airlines</h3>
            <p>Access flights from top airlines like AirIndia, IndiGo, and more.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p>Pay securely using Razorpay, UPI, or cards – with end-to-end encryption.</p>
          </div>
        </div>
      </section>
    
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Available Flights</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {flights.map((flight) => (
          <div key={flight.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{flight.airline}</h2>
                <p className="text-sm text-gray-600">{flight.from} → {flight.to}</p>
                <p className="text-sm">{flight.time} • {flight.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">${flight.price}</p>
                <p className="text-sm">{flight.direct ? 'Direct' : '1 Stop'}</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">Select</button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Flights
