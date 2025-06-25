import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { user, role, logout } = useAuthStore();

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-500">
        ✈️Flight<span className="text-white">Finder</span>
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:text-orange-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-orange-300">
              Register
            </Link>
          </>
        )}

        {user && role === "user" && (
          <>
            <Link to="/" className="hover:text-orange-300">
              Home
            </Link>
            <Link to="/bookings" className="hover:text-orange-300">
              My Bookings
            </Link>
            <button onClick={logout} className="hover:text-orange-300">
              Logout
            </button>
          </>
        )}

        {user && role === "operator" && (
          <>
            <Link to="/operator" className="hover:text-orange-300">
              My Flights
            </Link>
            <button onClick={logout} className="hover:text-orange-300">
              Logout
            </button>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-orange-300">
              Dashboard
            </Link>
            <button onClick={logout} className="hover:text-orange-300">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
