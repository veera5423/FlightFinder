import { useEffect } from 'react'
import useAdminStore from '../store/useAdminStore'

const AdminDashboard = () => {
  const { fetchOperators, operators,pendingOperators, fetchPendingOperators, approveOperator, rejectOperator,fetchStats, stats } = useAdminStore()

  useEffect(() => {
    fetchPendingOperators()
    fetchOperators()
    fetchStats()
  }, [])

  return (
    <>
    <h2>Total Users: {stats.users}</h2>
      <h2>Total Flights: {stats.flights}</h2>
      <h2>Total Bookings: {stats.bookings}</h2>

      <h3 className="mt-4">Operators:</h3>
      {operators.map(op => (
        <div key={op._id} className="border p-4 flex justify-between">
          <div>
            <p>Name: {op.name}</p>
            <p>Status: {op.status}</p>
          </div>
          {op.status === 'pending' && (
            <div className="space-x-2">
              <button onClick={() => approveOperator(op._id)} className="bg-green-500 px-3 text-white">Approve</button>
              <button onClick={() => rejectOperator(op._id)} className="bg-red-500 px-3 text-white">Reject</button>
            </div>
          )}
        </div>
      ))}
    
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pending Operator Requests</h1>
      {pendingOperators.length === 0 ? (
        <p>No pending requests 🎉</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOperators.map(op => (
              <tr key={op._id} className="text-center border-t">
                <td>{op.name}</td>
                <td>{op.email}</td>
                <td className="space-x-2">
                  <button onClick={() => approveOperator(op._id)} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                  <button onClick={() => rejectOperator(op._id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default AdminDashboard

