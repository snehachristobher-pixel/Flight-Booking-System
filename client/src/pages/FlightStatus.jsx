import Navbar from "../components/Navbar";

function FlightStatus() {
  const flights = [
    {
      flightNo: "AI101",
      status: "On Time",
    },
    {
      flightNo: "6E204",
      status: "Delayed",
    },
    {
      flightNo: "UK512",
      status: "Boarding",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Flight Status ✈️</h1>

        <div className="space-y-4">
          {flights.map((flight, index) => (
            <div key={index} className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-2xl font-bold">{flight.flightNo}</h2>

              <p className="text-green-400">{flight.status}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FlightStatus;
