import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function FlightDetails() {
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");

    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
    }
  }, []);

  const handleNext = () => {
    if (!flight) return;

    navigate("/passenger-details");
  };

  if (!flight) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="bg-slate-900 p-10 rounded-xl">
            <h1 className="text-2xl font-bold">No Flight Selected</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521727857535-28d2047314ac')",
        }}
      >
        <div className="min-h-screen bg-black/75 text-white p-10">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Flight Details ✈️
          </h1>

          <div className="bg-slate-900/85 backdrop-blur-sm p-8 rounded-xl max-w-4xl mx-auto border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">{flight.airline}</h2>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  flight.status === "Delayed"
                    ? "bg-yellow-600"
                    : flight.status === "Cancelled"
                      ? "bg-red-600"
                      : "bg-green-600"
                }`}
              >
                {flight.status || "On Time"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div>
                <p className="mb-3">
                  <strong>Source:</strong> {flight.source}
                </p>

                <p className="mb-3">
                  <strong>Destination:</strong> {flight.destination}
                </p>

                <p className="mb-3">
                  <strong>Price:</strong> ₹{flight.price}
                </p>

                <p className="mb-3">
                  <strong>Class:</strong> {flight.flightClass}
                </p>
              </div>

              <div>
                <p className="mb-3">
                  <strong>Departure:</strong> {flight.departureTime}
                </p>

                <p className="mb-3">
                  <strong>Arrival:</strong> {flight.arrivalTime}
                </p>

                <p className="mb-3">
                  <strong>Duration:</strong> {flight.duration}
                </p>

                <p className="mb-3">
                  <strong>Available Seats:</strong> {flight.seatsAvailable}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-lg mt-6">
              <h3 className="font-bold mb-2">Flight Information</h3>

              <p>Flight ID: {flight._id}</p>

              <p>Airline: {flight.airline}</p>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg mt-6">
              Please verify flight details before proceeding to passenger
              information.
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Continue Booking →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightDetails;
