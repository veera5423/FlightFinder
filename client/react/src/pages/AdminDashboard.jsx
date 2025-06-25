import { useEffect } from "react";
import useAdminStore from "../store/useAdminStore";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaPlane,
  FaBook,
  FaCalendarPlus,
} from "react-icons/fa";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const {
    fetchOperators,
    operators,
    pendingOperators,
    fetchPendingOperators,
    approveOperator,
    rejectOperator,
    fetchStats,
    stats,
  } = useAdminStore();

  useEffect(() => {
    fetchPendingOperators();
    fetchOperators();
    fetchStats();
  }, [pendingOperators]);

  return (
    <div className="p-6 space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-600">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome, Admin! Here are your system insights and controls.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <StatCard title="Total Users" count={stats.userCount} />
        <StatCard title="Approved Operators" count={stats.approvedOps} />
        <StatCard title="Pending Operators" count={stats.pendingOps} />
        <StatCard title="Total Flights" count={stats.flightCount} />
        <StatCard title="Total Bookings" count={stats.bookingCount} />
        <StatCard title="New Users This Month" count={stats.newUsers} />
      </div>

      {/* Approved Operators */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          All Operators
        </h2>
        <div className="space-y-4">
          {operators.map((op) => (
            <div
              key={op._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{op.name}</p>
                <p className="text-sm text-gray-500">{op.status}</p>
              </div>
              {op.status === "pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => approveOperator(op._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectOperator(op._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pending Requests Table */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          Pending Operator Requests
        </h2>
        {pendingOperators.length === 0 ? (
          <p className="text-gray-500">No pending requests 🎉</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse shadow rounded-lg bg-white">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOperators.map((op) => (
                  <tr key={op._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{op.name}</td>
                    <td className="p-3">{op.email}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => approveOperator(op._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectOperator(op._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
