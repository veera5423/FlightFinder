import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>; // or a spinner

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
