import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlights } from "../services/flightService";
import {
  getDashboardStats,
  getRecentBookings,
} from "../services/dashboardService";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [totalFlights, setTotalFlights] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [cancelledBookings, setCancelledBookings] = useState(0);
  const [averageBookingValue, setAverageBookingValue] = useState(0);
  const [cancellationRate, setCancellationRate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ROLE:", localStorage.getItem("role"));

    const isAdmin = localStorage.getItem("role");

    if (isAdmin !== "admin") {
      console.log("REDIRECTING TO HOME");
      navigate("/");
      return;
    }

    console.log("ADMIN VERIFIED");

    const fetchDashboardData = async () => {
      try {
        const stats = await getDashboardStats();
        const bookings = await getRecentBookings();

        console.log("STATS:", stats);

        setRecentBookings(bookings);

        setTotalFlights(stats.totalFlights);
        setTotalBookings(stats.totalBookings);
        setTotalUsers(stats.totalUsers);
        setTotalRevenue(stats.totalRevenue);
        setConfirmedBookings(stats.confirmedBookings);
        setCancelledBookings(stats.cancelledBookings);
        setAverageBookingValue(stats.averageBookingValue);
        setCancellationRate(stats.cancellationRate);
      } catch (error) {
        console.log("ERROR:", error);
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
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Average Booking Value</h2>

            <p className="text-4xl mt-4 text-purple-400">
              ₹{averageBookingValue}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Cancellation Rate</h2>

            <p className="text-4xl mt-4 text-orange-400">{cancellationRate}%</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl mt-8 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings ✈️</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-3">Booking ID</th>
                <th className="p-3">Passenger</th>
                <th className="p-3">Seat</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking._id} className="border-b border-slate-800">
                  <td className="p-3">{booking.bookingId}</td>

                  <td className="p-3">{booking.passengerName}</td>

                  <td className="p-3">{booking.seatNumber}</td>

                  <td className="p-3">
                    <span
                      className={
                        booking.status === "Confirmed"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
