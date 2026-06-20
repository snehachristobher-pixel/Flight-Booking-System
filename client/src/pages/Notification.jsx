import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Notification() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/booking-success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Notifications 📩</h1>

          <div className="space-y-4">
            <p>✅ Payment Successful</p>

            <p>📧 Booking Confirmation Email Generated</p>

            <p>📱 SMS Notification Ready</p>

            <p>🎫 E-Ticket Generated Successfully</p>

            <p>✈️ Flight Status: On Time</p>

            <p>🕒 Departure Reminder: 2 Hours Before Flight</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
