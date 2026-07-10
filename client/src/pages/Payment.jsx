import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(null);

  useEffect(() => {
    const selectedFlight = localStorage.getItem("selectedFlight");
    const passengerData = localStorage.getItem("passengerDetails");

    if (selectedFlight) {
      setFlight(JSON.parse(selectedFlight));
    }

    if (passengerData) {
      setPassengerDetails(JSON.parse(passengerData));
    }
  }, []);
  const totalAmount =
    (flight?.price || 0) * Number(passengerDetails?.passengerCount || 1) + 500;

  const handleRazorpayPayment = async () => {
    try {
      const amount = totalAmount;
      const { data } = await axios.post(
        "https://flight-booking-system-rcgo.onrender.com/api/payment/create-order",
        {
          amount,
        },
      );

      const options = {
        key: "rzp_test_TA6GKnKnJgOjDk",
        amount: data.amount,
        currency: data.currency,
        name: "SkyJourney",
        description: "Flight Booking Payment",
        order_id: data.id,

        handler: function () {
          navigate("/payment-processing");
        },

        prefill: {
          name: passengerDetails?.passengers?.[0]?.name || "",
          email: passengerDetails?.email || "",
          contact: passengerDetails?.phone || "",
        },

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  const handlePayment = () => {
    handleRazorpayPayment();
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502920917128-1aa500764ce7')",
        }}
      >
        <div className="min-h-screen bg-black/75 text-white p-10">
          <h1 className="text-4xl font-bold text-center mb-8">
            Secure Payment 💳
          </h1>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="md:col-span-2 bg-slate-900/85 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
              <div className="bg-slate-800 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-bold mb-3">
                  Razorpay Secure Checkout
                </h2>

                <p className="text-slate-300">
                  Continue to Razorpay to pay using UPI, Credit Card, Debit
                  Card, Net Banking or Wallets.
                </p>
              </div>
              <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg mt-6">
                🔒 Secure payment protected by SSL encryption.
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                  ← Back
                </button>

                <button
                  onClick={handlePayment}
                  className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
                >
                  Proceed to Razorpay →
                </button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-slate-900/85 backdrop-blur-sm p-6 rounded-xl border border-slate-700 h-fit">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              <p className="mb-3">
                <strong>Airline:</strong> {flight?.airline || "-"}
              </p>

              <p className="mb-3">
                <strong>Route:</strong> {flight?.source || "-"} →{" "}
                {flight?.destination || "-"}
              </p>

              <p className="mb-3">
                <strong>Class:</strong> {flight?.flightClass || "-"}
              </p>

              <p className="mb-3">
                <strong>Status:</strong> {flight?.status || "On Time"}
              </p>

              <p className="mb-3">
                <strong>Departure:</strong> {flight?.departureTime || "-"}
              </p>

              <p className="mb-3">
                <strong>Arrival:</strong> {flight?.arrivalTime || "-"}
              </p>
              <p className="mb-3">
                <strong>Passengers:</strong>{" "}
                {passengerDetails?.passengerCount || 1}
              </p>

              <p className="mb-3">
                <strong>Fare Per Passenger:</strong> ₹{flight?.price || 0}
              </p>

              <p className="mb-3">
                <strong>Taxes & Fees:</strong> ₹500
              </p>

              <hr className="my-4 border-slate-700" />

              <h3 className="text-3xl font-bold text-green-400">
                ₹{totalAmount}
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Total payable amount including taxes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
