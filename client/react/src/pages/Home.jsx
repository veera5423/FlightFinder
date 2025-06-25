const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZsaWdodHxlbnwwfHwwfHx8MA%3D%3D)",
        }}
      >
        {/* bg-black bg-opacity-60 */}
        <div className="absolute inset-0  bg-opacity-60 "></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Book Your Dream Flight ✈️</h1>
          <p className="text-xl mb-6">
            Find the best deals and fly hassle-free.
          </p>
          <a
            href="#search"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold transition"
          >
            Search Flights
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          Why Choose FlightFinder?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Fast & Easy Booking</h3>
            <p>
              Book your tickets in minutes with our optimized search and booking
              experience.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Trusted Airlines</h3>
            <p>
              Access flights from top airlines like AirIndia, IndiGo, and more.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p>
              Pay securely using Razorpay, UPI, or cards – with end-to-end
              encryption.
            </p>
          </div>
        </div>
      </section>
      <section id="search" className="py-20 bg-white px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
            Start Your Journey with Ease
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Planning your next trip just got simpler! Whether you're heading for
            a vacation, a business meeting, or a spontaneous getaway —
            FlightFinder brings you the best flights at unbeatable prices. No
            hidden fees. No long forms. Just quick and easy booking.
          </p>
          <a
            href="/flights"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition"
          >
            Find Flights Now
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          What Our Users Say
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p>
              "FlightFinder helped me book a last-minute business flight with
              ease. Great UX!"
            </p>
            <span className="block mt-2 font-bold">– John M.</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p>
              "Super fast and really easy to use. Loved the clean design and
              filters."
            </p>
            <span className="block mt-2 font-bold">– Ayesha R.</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
