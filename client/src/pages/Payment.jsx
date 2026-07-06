import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [flight, setFlight] = useState(null);

  const [form, setForm] = useState({
    upiId: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
  });

  useEffect(() => {
    const selectedFlight = localStorage.getItem("selectedFlight");

    if (selectedFlight) {
      setFlight(JSON.parse(selectedFlight));
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleRazorpayPayment = async () => {
    try {
      const amount = (flight?.price || 0) + 500;

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
          name: "Customer",
          email: "customer@example.com",
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
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (paymentMethod === "UPI" && !form.upiId) {
      setError("Please enter your UPI ID.");
      return;
    }

    if (
      (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") &&
      (!form.cardNumber || !form.cardHolder || !form.expiry || !form.cvv)
    ) {
      setError("Please complete all card details.");
      return;
    }

    if (
      paymentMethod === "Net Banking" &&
      (!form.bankName || !form.accountNumber)
    ) {
      setError("Please complete bank details.");
      return;
    }

    setError("");

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
              {error && (
                <div className="bg-red-600 p-3 rounded-lg mb-6">{error}</div>
              )}

              <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  UPI Payment
                </label>

                <label className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    value="Credit Card"
                    checked={paymentMethod === "Credit Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit Card
                </label>

                <label className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    value="Debit Card"
                    checked={paymentMethod === "Debit Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Debit Card
                </label>

                <label className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    value="Net Banking"
                    checked={paymentMethod === "Net Banking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Net Banking
                </label>
              </div>

              {/* UPI */}
              {paymentMethod === "UPI" && (
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter UPI ID (example@ybl)"
                  value={form.upiId}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-800"
                />
              )}

              {/* Cards */}
              {(paymentMethod === "Credit Card" ||
                paymentMethod === "Debit Card") && (
                <>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full p-3 rounded mb-4 bg-slate-800"
                  />

                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    value={form.cardHolder}
                    onChange={handleChange}
                    className="w-full p-3 rounded mb-4 bg-slate-800"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleChange}
                      className="p-3 rounded bg-slate-800"
                    />

                    <input
                      type="password"
                      name="cvv"
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={handleChange}
                      className="p-3 rounded bg-slate-800"
                    />
                  </div>
                </>
              )}

              {/* Net Banking */}
              {paymentMethod === "Net Banking" && (
                <>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={form.bankName}
                    onChange={handleChange}
                    className="w-full p-3 rounded mb-4 bg-slate-800"
                  />

                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={form.accountNumber}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-800"
                  />
                </>
              )}

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
                  Pay Now →
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
                <strong>Base Fare:</strong> ₹{flight?.price || 0}
              </p>

              <p className="mb-3">
                <strong>Taxes & Fees:</strong> ₹500
              </p>

              <hr className="my-4 border-slate-700" />

              <h3 className="text-3xl font-bold text-green-400">
                ₹{(flight?.price || 0) + 500}
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
