import FlightForm from "../components/FlightForm";
import OperatorStats from "../components/OperatorStats";
import MyFlightsTable from "./MyFlightsTable";

const OperatorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛫 Operator Dashboard</h1>
      <FlightForm />
      <OperatorStats />

      <MyFlightsTable />
    </div>
  );
};

export default OperatorDashboard;
