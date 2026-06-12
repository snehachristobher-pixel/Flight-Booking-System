import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-slate-800 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold text-blue-500">SkyJourney ✈️</h1>

      <ul className="flex gap-8 font-medium items-center">
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

        {!token ? (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>

            <li>
              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
