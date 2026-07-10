import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PassengerCount() {
  const navigate = useNavigate();

  const [count, setCount] = useState(1);

  const handleContinue = () => {
    localStorage.setItem("passengerCount", count);

    navigate("/passenger-details");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Select Number of Passengers
          </h1>
          <label className="block mb-2 text-lg font-medium">
            Number of Passengers
          </label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 mb-6"
          >
            <option value={1}>1 Passenger</option>
            <option value={2}>2 Passengers</option>
            <option value={3}>3 Passengers</option>
            <option value={4}>4 Passengers</option>
            <option value={5}>5 Passengers</option>
          </select>

          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue →
          </button>
        </div>
      </div>
    </>
  );
}

export default PassengerCount;
