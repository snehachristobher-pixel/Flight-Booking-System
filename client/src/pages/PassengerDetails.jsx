import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PassengerDetails() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [seatError, setSeatError] = useState("");
  const passengerCount = Number(localStorage.getItem("passengerCount")) || 1;
  const [ageError, setAgeError] = useState("");

  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  const [passengers, setPassengers] = useState(
    Array.from({ length: passengerCount }, () => ({
      name: "",
      age: "",
      gender: "",
      seatPreference: "",
      selectedSeat: "",
    })),
  );

  const seats = [
    "A1",
    "A2",
    "A3",
    "A4",
    "B1",
    "B2",
    "B3",
    "B4",
    "C1",
    "C2",
    "C3",
    "C4",
    "D1",
    "D2",
    "D3",
    "D4",
  ];

  const handleSeatSelect = (index, seat) => {
    const alreadySelected = passengers.some(
      (passenger, passengerIndex) =>
        passengerIndex !== index && passenger.selectedSeat === seat,
    );

    if (alreadySelected) {
      setSeatError(`Seat ${seat} is already selected by another passenger.`);
      return;
    }

    setSeatError("");

    const updatedPassengers = [...passengers];

    updatedPassengers[index].selectedSeat = seat;

    setPassengers(updatedPassengers);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];

    updatedPassengers[index][field] = value;

    setPassengers(updatedPassengers);
  };
  const handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/\D/g, "");

    setForm({
      ...form,
      phone,
    });
  };

  const handleNext = () => {
    for (const passenger of passengers) {
      if (
        !passenger.name ||
        !passenger.age ||
        !passenger.gender ||
        !passenger.seatPreference ||
        !passenger.selectedSeat
      ) {
        setError("Please complete all passenger details.");
        return;
      }

      if (Number(passenger.age) < 1 || Number(passenger.age) > 120) {
        setError("Please enter a valid age.");
        return;
      }
    }

    if (!form.email || !form.phone) {
      setError("Please enter email and phone number.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setError("");

    localStorage.setItem(
      "passengerDetails",
      JSON.stringify({
        ...form,
        passengerCount,
        passengers,
      }),
    );

    navigate("/review-booking");
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828')",
        }}
      >
        <div className="min-h-screen bg-black/75 text-white p-10">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Passenger Details 👤
          </h1>

          <div className="max-w-3xl mx-auto bg-slate-900/85 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
            {error && (
              <div className="bg-red-600 p-3 rounded-lg mb-6">{error}</div>
            )}
            {seatError && (
              <div className="bg-red-900/40 border border-red-600 text-red-300 p-3 rounded-lg mb-4">
                ⚠️ {seatError}
              </div>
            )}
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="border border-slate-700 p-4 rounded-lg mb-6"
              >
                <h2 className="text-xl font-bold mb-4">
                  Passenger {index + 1}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Passenger Name"
                    value={passenger.name}
                    onChange={(e) =>
                      handlePassengerChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 rounded bg-slate-800"
                  />

                  <input
                    type="number"
                    placeholder="Age"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (Number(value) > 120) {
                        setAgeError(
                          "Age limit is 120. Please enter a valid age.",
                        );
                        return;
                      }

                      setAgeError("");
                      handlePassengerChange(index, "age", value);
                    }}
                    className="w-full p-3 rounded bg-slate-800"
                  />
                  {ageError && (
                    <div className="md:col-span-2">
                      <p className="text-red-400 text-sm">{ageError}</p>
                    </div>
                  )}
                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      handlePassengerChange(index, "gender", e.target.value)
                    }
                    className="w-full p-3 rounded bg-slate-800"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    value={passenger.seatPreference}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "seatPreference",
                        e.target.value,
                      )
                    }
                    className="w-full p-3 rounded bg-slate-800"
                  >
                    <option value="">Seat Preference</option>
                    <option value="Window">Window</option>
                    <option value="Aisle">Aisle</option>
                    <option value="Middle">Middle</option>
                  </select>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                  {seats.map((seat) => {
                    const isTaken = passengers.some(
                      (p, i) => i !== index && p.selectedSeat === seat,
                    );

                    return (
                      <button
                        key={seat}
                        type="button"
                        disabled={isTaken}
                        onClick={() => handleSeatSelect(index, seat)}
                        className={`p-2 rounded ${
                          passenger.selectedSeat === seat
                            ? "bg-green-600"
                            : isTaken
                              ? "bg-red-700 cursor-not-allowed opacity-50"
                              : "bg-slate-700"
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>

                {passenger.selectedSeat && (
                  <p className="mt-2 text-green-400">
                    Selected Seat: {passenger.selectedSeat}
                  </p>
                )}
              </div>
            ))}
            <div className="mt-6">
              <label className="block mb-2 font-medium">Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Booking confirmation will be sent here"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded mb-4 bg-slate-800"
              />

              <label className="block mb-2 font-medium">Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                value={form.phone}
                onChange={handlePhoneChange}
                maxLength={10}
                className="w-full p-3 rounded bg-slate-800"
              />
            </div>

            <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg mt-6">
              Your booking confirmation and e-ticket will be sent to the email
              address provided above.
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
                className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Review Booking →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassengerDetails;
