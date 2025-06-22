import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
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

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1589149098258-3e9102cd63d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Book Your Dream Flight ✈️</h1>
          <p className="text-xl mb-6">Find the best deals and fly hassle-free.</p>
          <a href="#search" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold transition">Search Flights</a>
        </div>
      </section>

      {/* Search Form */}
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

      {/* Testimonials */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p>"FlightFinder helped me book a last-minute business flight with ease. Great UX!"</p>
            <span className="block mt-2 font-bold">– John M.</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p>"Super fast and really easy to use. Loved the clean design and filters."</p>
            <span className="block mt-2 font-bold">– Ayesha R.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-black text-white py-8 text-center">
        <p className="text-sm">© 2025 FlightFinder. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <a href="https://github.com/veera5423" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/veeranjaneyulu-v" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
        </div>
      </footer> */}
      <Footer/>
    </>
  )
}

export default Home
