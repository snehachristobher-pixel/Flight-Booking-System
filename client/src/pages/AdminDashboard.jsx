import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlights } from "../services/flightService";
import { getDashboardStats } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [totalFlights, setTotalFlights] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [cancelledBookings, setCancelledBookings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("role");

    if (isAdmin !== "admin") {
      navigate("/");
      return;
    }
    const fetchDashboardData = async () => {
      try {
        const stats = await getDashboardStats();
        console.log("DASHBOARD STATS:", stats);

        setTotalFlights(stats.totalFlights);
        setTotalBookings(stats.totalBookings);
        setTotalUsers(stats.totalUsers);
        setTotalRevenue(stats.totalRevenue);
        setConfirmedBookings(stats.confirmedBookings);
        setCancelledBookings(stats.cancelledBookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard 📊</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Flights</h2>

            <p className="text-4xl mt-4 text-blue-400">{totalFlights}</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Bookings</h2>

            <p className="text-4xl mt-4 text-green-400">{totalBookings}</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Users</h2>

            <p className="text-4xl mt-4 text-yellow-400">{totalUsers}</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Revenue</h2>

            <p className="text-4xl mt-4 text-cyan-400">₹{totalRevenue}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Confirmed Bookings</h2>

            <p className="text-4xl mt-4 text-green-400">{confirmedBookings}</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Cancelled Bookings</h2>

            <p className="text-4xl mt-4 text-red-400">{cancelledBookings}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
