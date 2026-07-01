import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { updateBooking } from "../services/bookingService";

function EditBooking() {
  const location = useLocation();
  const booking = location.state?.booking;
  const navigate = useNavigate();

  const [passengerName, setPassengerName] = useState(
    booking?.passengerName || "",
  );

  const [phone, setPhone] = useState(booking?.phone || "");

  const [seatNumber, setSeatNumber] = useState(booking?.seatNumber || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      await updateBooking(booking._id, {
        passengerName,
        phone,
        seatNumber,
        status: booking.status,
        flightId: booking.flightId,
      });

      setMessage("✅ Booking updated successfully");

      setTimeout(() => {
        navigate("/bookings");
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage("❌ Failed to update booking");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Edit Booking ✏️</h1>
          {message && (
            <div className="mb-6 bg-green-600 text-white p-4 rounded-lg">
              {message}
            </div>
          )}
          <div className="space-y-4">
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <button
              onClick={handleUpdate}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              Update Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBooking;
