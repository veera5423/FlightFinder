// src/pages/MyBookingsPage.jsx
import { useEffect, useState } from "react";
import { API } from "../store/useAuthStore";
import BookingSkeleton from "../components/BookingSkeleton";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      alert("Could not load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-4">
        <BookingSkeleton />
        <BookingSkeleton />
        <BookingSkeleton />
      </div>
    );
  }

  if (bookings.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have no bookings yet.
      </p>
    );

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
          My Bookings
        </h1>
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow border"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {booking.flight.airline}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {booking.flight.from} → {booking.flight.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.flight.time} • {booking.flight.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 text-lg font-bold">
                    ₹{booking.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment: {booking.paymentStatus}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  Seats:{" "}
                  <span className="font-semibold">
                    {booking.seats.join(", ")}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
