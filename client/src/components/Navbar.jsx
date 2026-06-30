import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 text-white border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-5">
        <h1 className="text-3xl font-bold text-blue-500">SkyJourney ✈️</h1>

        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className="hidden md:flex gap-6 font-medium items-center">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/flights">Flights</Link>
          </li>

          <li>
            <Link to="/bookings">My Bookings</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          {role === "admin" && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}

          <li>
            <Link to="/flight-status">Flight Status</Link>
          </li>

          {token ? (
            <>
              <li className="text-green-400">{userName}</li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register" className="bg-blue-600 px-4 py-2 rounded">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <ul className="flex flex-col items-center gap-5 py-6">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/flights" onClick={() => setMenuOpen(false)}>
                Flights
              </Link>
            </li>

            <li>
              <Link to="/bookings" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
            </li>

            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li>

            {role === "admin" && (
              <li>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <Link to="/flight-status" onClick={() => setMenuOpen(false)}>
                Flight Status
              </Link>
            </li>

            {token ? (
              <>
                <li className="text-green-400 font-semibold">
                  Welcome, {userName}
                </li>

                <li className="w-48">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 w-full py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
