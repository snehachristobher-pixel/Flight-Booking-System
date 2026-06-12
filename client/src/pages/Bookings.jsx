import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../services/bookingService";
import Navbar from "../components/Navbar";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.log(error);
        setMessage("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      await deleteBooking(id);

      setBookings(bookings.filter((booking) => booking._id !== id));

      setMessage("Booking cancelled successfully.");
    } catch (error) {
      console.log(error);
      setMessage("Failed to cancel booking.");
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.passengerName?.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">My Bookings 🎫</h1>

          <div className="bg-slate-900 px-5 py-3 rounded-lg">
            Total Bookings: {bookings.length}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by Passenger Name or Booking ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 bg-slate-900 p-4 rounded-lg border border-slate-700"
        />

        {message && (
          <div className="mb-6 bg-slate-800 text-green-400 p-4 rounded-lg">
            {message}
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="bg-slate-900 p-10 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>

            <p className="text-slate-400">
              Your booked flights will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {booking.passengerName}
                  </h2>

                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                    {booking.bookingId || "N/A"}
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p>
                    <strong>Flight ID:</strong> {booking.flightId}
                  </p>

                  <p>
                    <strong>Seat Number:</strong> {booking.seatNumber}
                  </p>

                  <p>
                    <strong>Email:</strong> {booking.email || "-"}
                  </p>

                  <p>
                    <strong>Phone:</strong> {booking.phone || "-"}
                  </p>

                  <p>
                    <strong>Seat Preference:</strong>{" "}
                    {booking.seatPreference || "-"}
                  </p>

                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleString()
                      : "-"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-400 font-semibold">
                      {booking.status || "Confirmed"}
                    </span>
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    <span className="text-cyan-400 font-semibold">
                      {booking.paymentStatus || "Paid"}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-6 bg-red-600 px-5 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;
