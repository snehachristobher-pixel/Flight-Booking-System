import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function ReviewBooking() {
  const navigate = useNavigate();

  const [passenger, setPassenger] = useState(null);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const storedPassenger = localStorage.getItem("passengerDetails");

    const selectedFlight = localStorage.getItem("selectedFlight");

    if (storedPassenger) {
      setPassenger(JSON.parse(storedPassenger));
    }

    if (selectedFlight) {
      setFlight(JSON.parse(selectedFlight));
    }
  }, []);

  const handleProceed = () => {
    if (!passenger || !flight) {
      alert("Missing passenger or flight information.");
      return;
    }

    navigate("/payment");
  };

  if (!flight || !passenger) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="bg-slate-900 p-10 rounded-xl">
            <h1 className="text-2xl font-bold">Booking Information Missing</h1>

            <button
              onClick={() => navigate("/flights")}
              className="mt-6 bg-blue-600 px-6 py-3 rounded-lg"
            >
              Browse Flights
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Review Booking 📋</h1>

        <div className="bg-slate-900 p-8 rounded-xl max-w-5xl mx-auto">
          {/* Flight Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Flight Summary ✈️</h2>

            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{flight.airline}</h3>

                <span className="bg-green-600 px-4 py-1 rounded-full text-sm">
                  {flight.status || "On Time"}
                </span>
              </div>

              <p className="mb-2">
                <strong>Route:</strong> {flight.source} → {flight.destination}
              </p>

              <p className="mb-2">
                <strong>Price:</strong> ₹{flight.price}
              </p>

              <p className="mb-2">
                <strong>Available Seats:</strong> {flight.seatsAvailable}
              </p>

              <p className="mb-2">
                <strong>Departure:</strong> {flight.departureTime}
              </p>

              <p className="mb-2">
                <strong>Arrival:</strong> {flight.arrivalTime}
              </p>

              <p className="mb-2">
                <strong>Duration:</strong> {flight.duration}
              </p>

              <p className="mb-2">
                <strong>Class:</strong> {flight.flightClass}
              </p>

              <p>
                <strong>Flight ID:</strong> {flight._id}
              </p>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Passenger Details 👤</h2>

            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="mb-2">
                <strong>Name:</strong> {passenger.name}
              </p>

              <p className="mb-2">
                <strong>Age:</strong> {passenger.age}
              </p>

              <p className="mb-2">
                <strong>Gender:</strong> {passenger.gender}
              </p>

              <p className="mb-2">
                <strong>Email:</strong> {passenger.email}
              </p>

              <p className="mb-2">
                <strong>Phone:</strong> {passenger.phone}
              </p>

              <p>
                <strong>Seat Preference:</strong> {passenger.seatPreference}
              </p>
            </div>
          </div>

          {/* Booking Checklist */}
          <div className="bg-slate-800 p-5 rounded-lg mb-8">
            <h3 className="text-lg font-bold mb-3">Booking Checklist ✅</h3>

            <ul className="space-y-2 text-slate-300">
              <li>✓ Passenger details verified</li>
              <li>✓ Flight details verified</li>
              <li>✓ Payment pending</li>
              <li>✓ Ticket will be emailed after payment</li>
            </ul>
          </div>

          {/* Notice */}
          <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg text-yellow-200 mb-8">
            Please verify all details carefully. Changes may not be possible
            after ticket confirmation.
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              ← Back
            </button>

            <button
              onClick={handleProceed}
              className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Proceed to Payment →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewBooking;
