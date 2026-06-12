import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard 📊</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Flights</h2>

            <p className="text-4xl mt-4 text-blue-400">--</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Bookings</h2>

            <p className="text-4xl mt-4 text-green-400">--</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-xl font-bold">Total Users</h2>

            <p className="text-4xl mt-4 text-cyan-400">--</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl mt-8">
          <h2 className="text-2xl font-bold mb-4">Project Features</h2>

          <ul className="space-y-2 text-slate-300">
            <li>✅ User Authentication</li>
            <li>✅ Flight Search</li>
            <li>✅ Flight Booking</li>
            <li>✅ Payment Module</li>
            <li>✅ Email Notifications</li>
            <li>✅ PDF Ticket Download</li>
            <li>✅ Booking Management</li>
            <li>✅ Flight Status Tracking</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
