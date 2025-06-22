
import { useEffect } from 'react'
import useOperatorStore from '../store/useOperatorStore'
import FlightForm from '../components/FlightForm'

const OperatorDashboard = () => {
  const { flights, fetchMyFlights } = useOperatorStore()

  useEffect(() => {
    fetchMyFlights()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛫 Operator Dashboard</h1>

      <FlightForm />

      <h2 className="text-xl font-semibold mb-2">Your Flights</h2>
      {flights.length === 0 ? (
        <p>No flights added yet.</p>
      ) : (
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Flight No</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f, i) => (
              <tr key={f._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{f.flightNumber}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td>{new Date(f.departureTime).toLocaleString()}</td>
                <td>{f.availableSeats}/{f.totalSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OperatorDashboard
