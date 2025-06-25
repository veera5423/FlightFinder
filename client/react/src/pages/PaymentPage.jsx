import { useLocation } from "react-router-dom";
import PaymentSection from "./PaymentSection";

const PaymentPage = () => {
  const location = useLocation();
  const flight = location.state?.flight;

  if (!flight) {
    return <p className="text-center mt-10 text-red-600">No flight selected</p>;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto mb-6 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Payment for Your Flight
        </h1>
        <p className="text-lg text-gray-700">
          You're booking <strong>{flight.airline}</strong> from{" "}
          <strong>{flight.from}</strong> to <strong>{flight.to}</strong>.
        </p>
        <p className="text-xl font-semibold mt-2">
          Amount Per Person: ₹{flight.price.toLocaleString()}
        </p>
      </div>

      <PaymentSection amount={flight.price} flight={flight} />
    </div>
  );
};

export default PaymentPage;
