import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PaymentSection = ({ amount, flight }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { addBooking } = useAuthStore();
  const navigate = useNavigate();

  const totalAmount = amount * selectedSeats.length;

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const seatRows = ["A", "B", "C", "D"];
  const seatNumbers = [1, 2, 3, 4, 5, 6];

  const handlePaymentClick = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      flightId: flight._id,
      seats: selectedSeats,
      totalPrice: totalAmount,
      paymentStatus: "paid", // optional, backend defaults to 'pending'
    };

    const res = await addBooking(bookingData);

    if (res.success) {
      navigate("/bookings");
    } else {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 text-center">
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Seats</label>
        <div className="grid grid-cols-6 gap-2">
          {seatNumbers.map((num) =>
            seatRows.map((row) => {
              const seatId = `${num}${row}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  type="button"
                  onClick={() => toggleSeat(seatId)}
                  className={`border px-2 py-1 rounded ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {seatId}
                </button>
              );
            })
          )}
        </div>
      </div>

      {!showPayment ? (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Total Amount:{" "}
            <span className="text-2xl text-orange-600 font-bold">
              ₹{totalAmount.toLocaleString()}
            </span>
          </h2>
          <button
            onClick={handlePaymentClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Proceed to Payment
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md text-left">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Payment Details
          </h2>
          <p className="text-lg mb-4 font-semibold text-gray-800">
            Amount to Pay: ₹{totalAmount.toLocaleString()}
          </p>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Payment Method</label>
              <select className="w-full px-4 py-2 border rounded">
                <option>Credit/Debit Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Pay ₹{totalAmount.toLocaleString()}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PaymentSection;
