import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        console.log("DASHBOARD DATA:", data);

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard Analytics 📊</h1>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-blue-400">
              {stats?.totalFlights || 0}
            </h2>

            <p>Total Flights</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-green-400">
              {stats?.totalBookings || 0}
            </h2>

            <p>Total Bookings</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-cyan-400">
              {stats?.confirmedBookings || 0}
            </h2>

            <p>Confirmed</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-red-400">
              {stats?.cancelledBookings || 0}
            </h2>

            <p>Cancelled</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-yellow-400">
              ₹{stats?.totalRevenue || 0}
            </h2>

            <p>Total Revenue</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
