import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../services/bookingService";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

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
  const handleEdit = async (booking) => {
    const newName = prompt("Enter Passenger Name", booking.passengerName);

    if (!newName) return;

    const updatedBookings = bookings.map((b) =>
      b._id === booking._id ? { ...b, passengerName: newName } : b,
    );

    setBookings(updatedBookings);

    setMessage("Booking updated successfully.");
  };

  const handleDelete = async () => {
    try {
      await deleteBooking(selectedBookingId);

      setBookings(
        bookings.filter((booking) => booking._id !== selectedBookingId),
      );

      setMessage("Booking cancelled successfully.");

      setShowCancelModal(false);
      setSelectedBookingId(null);
    } catch (error) {
      console.log(error);
      setMessage("Failed to cancel booking.");
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.passengers?.some((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()),
      ) || booking.bookingId?.toLowerCase().includes(search.toLowerCase()),
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
                    {booking.passengers?.[0]?.name || "Passenger"}
                  </h2>
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                    {booking.bookingId || "N/A"}
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p>
                    <strong>Flight ID:</strong> {booking.flightId}
                  </p>

                  <div className="mt-3">
                    <strong>Passengers:</strong>

                    {booking.passengers?.map((person, index) => (
                      <div
                        key={index}
                        className="bg-slate-800 p-3 rounded mt-2"
                      >
                        <p>
                          <strong>Name:</strong> {person.name}
                        </p>

                        <p>
                          <strong>Age:</strong> {person.age}
                        </p>

                        <p>
                          <strong>Gender:</strong> {person.gender}
                        </p>

                        <p>
                          <strong>Seat:</strong> {person.selectedSeat}
                        </p>

                        <p>
                          <strong>Preference:</strong> {person.seatPreference}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p>
                    <strong>Email:</strong> {booking.email || "-"}
                  </p>

                  <p>
                    <strong>Phone:</strong> {booking.phone || "-"}
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

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/edit-booking/${booking._id}`}
                    state={{ booking }}
                    className="bg-yellow-600 px-5 py-3 rounded-lg hover:bg-yellow-700 transition"
                  >
                    Edit Booking
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedBookingId(booking._id);
                      setShowCancelModal(true);
                    }}
                    className="bg-red-600 px-5 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-xl w-96 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Cancel Booking</h2>

            <p className="mb-6">
              Are you sure you want to cancel this booking?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBookingId(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Bookings;
