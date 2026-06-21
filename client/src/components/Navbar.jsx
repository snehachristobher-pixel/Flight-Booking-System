import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <nav className="w-full overflow-x-auto flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold text-blue-500">SkyJourney ✈️</h1>

      <ul className="flex gap-6 font-medium items-center whitespace-nowrap">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>

        <li>
          <Link to="/flights" className="hover:text-blue-400">
            Flights
          </Link>
        </li>

        <li>
          <Link to="/bookings" className="hover:text-blue-400">
            My Bookings
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-400">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/flight-status" className="hover:text-blue-400">
            Flight Status
          </Link>
        </li>

        {token ? (
          <>
            <li className="text-green-400 font-semibold">
              Welcome, {userName} 👋
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
