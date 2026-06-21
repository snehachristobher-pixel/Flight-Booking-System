import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlightStatus } from "../services/FlightStatusService";

function FlightStatus() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlightStatus = async () => {
      try {
        const data = await getFlightStatus();

        setFlights(data.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFlightStatus();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Real-Time Flight Status ✈️</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-xl border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-blue-400">
                {flight.flight?.iata || "N/A"}
              </h2>

              <p>Airline: {flight.airline?.name || "Unknown"}</p>

              <p>From: {flight.departure?.airport || "N/A"}</p>

              <p>To: {flight.arrival?.airport || "N/A"}</p>

              <p className="text-green-400 font-semibold">
                Status: {flight.flight_status || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FlightStatus;
