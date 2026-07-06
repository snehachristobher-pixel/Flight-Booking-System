import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../services/flightService";
import Navbar from "../components/Navbar";

function Flights() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [sourceSearch, setSourceSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFlights();
  }, []);

  const filteredFlights = flights
    .filter((flight) => {
      return (
        flight.source.toLowerCase().includes(sourceSearch.toLowerCase()) &&
        flight.destination
          .toLowerCase()
          .includes(destinationSearch.toLowerCase()) &&
        (airlineFilter === "" || flight.airline === airlineFilter) &&
        (classFilter === "" || flight.flightClass === classFilter)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortOrder === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  const handleViewDetails = (flight) => {
    if (flight.seatsAvailable <= 0) {
      alert("This flight is sold out.");
      return;
    }

    localStorage.setItem("selectedFlight", JSON.stringify(flight));

    navigate("/flight-details");
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad')",
        }}
      >
        <div className="min-h-screen bg-black/75 text-white p-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold">Search Flights ✈️</h1>

            <div className="bg-slate-900/85 px-5 py-3 rounded-lg backdrop-blur-sm">
              Available Flights: {filteredFlights.length}
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-slate-900/85 backdrop-blur-sm p-6 rounded-xl mb-10">
            <h2 className="text-xl font-bold mb-4">Search Flights</h2>

            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={airlineFilter}
                onChange={(e) => setAirlineFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg w-full"
              >
                <option value="">All Airlines</option>

                {[...new Set(flights.map((flight) => flight.airline))].map(
                  (airline) => (
                    <option key={airline} value={airline}>
                      {airline}
                    </option>
                  ),
                )}
              </select>

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg w-full"
              >
                <option value="">All Classes</option>

                <option value="Economy">Economy</option>

                <option value="Business">Business</option>

                <option value="First Class">First Class</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg w-full"
              >
                <option value="">Sort By Price</option>

                <option value="lowToHigh">Price: Low to High</option>

                <option value="highToLow">Price: High to Low</option>
              </select>
              <input
                type="text"
                placeholder="Departure City"
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="Arrival City"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-3 rounded-lg w-full"
              />
            </div>
          </div>

          {/* Flight Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredFlights.map((flight) => (
              <div
                key={flight._id}
                className="bg-slate-900/85 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{flight.airline}</h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      flight.status === "Boarding"
                        ? "bg-blue-600"
                        : flight.status === "Delayed"
                          ? "bg-yellow-600"
                          : flight.status === "Cancelled"
                            ? "bg-red-600"
                            : "bg-green-600"
                    }`}
                  >
                    {flight.status || "On Time"}
                  </span>
                </div>

                <p className="text-lg mb-2">
                  {flight.source} → {flight.destination}
                </p>

                <p className="text-green-400 text-2xl font-bold mb-3">
                  ₹{flight.price}
                </p>

                <div className="space-y-2 text-slate-300">
                  <p className="font-semibold">
                    🪑 Seats Available: {flight.seatsAvailable}
                  </p>

                  {flight.seatsAvailable <= 5 && flight.seatsAvailable > 0 && (
                    <p className="text-yellow-400 font-bold">
                      ⚠️ Hurry! Only {flight.seatsAvailable} seats left
                    </p>
                  )}

                  <p>
                    🕒 {flight.departureTime} - {flight.arrivalTime}
                  </p>

                  <p>⏱ Duration: {flight.duration}</p>

                  <p>💺 Class: {flight.flightClass}</p>
                </div>

                {flight.seatsAvailable > 0 ? (
                  <button
                    onClick={() => handleViewDetails(flight)}
                    className="mt-6 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details →
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-6 w-full bg-red-600 py-3 rounded-lg cursor-not-allowed"
                  >
                    SOLD OUT
                  </button>
                )}
              </div>
            ))}
          </div>

          {filteredFlights.length === 0 && (
            <div className="bg-slate-900/85 backdrop-blur-sm p-10 rounded-xl text-center mt-10">
              <h2 className="text-2xl font-bold mb-2">No Flights Found</h2>

              <p className="text-slate-400">
                Try changing the departure or arrival city.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Flights;
