import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PassengerDetails() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    seatPreference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/\D/g, "");

    setForm({
      ...form,
      phone,
    });
  };

  const handleNext = () => {
    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (
      !cleanedForm.name ||
      !cleanedForm.age ||
      !cleanedForm.gender ||
      !cleanedForm.email ||
      !cleanedForm.phone ||
      !cleanedForm.seatPreference
    ) {
      setError("Please complete all fields before proceeding.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(cleanedForm.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(cleanedForm.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (Number(cleanedForm.age) < 1 || Number(cleanedForm.age) > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return;
    }

    setError("");

    localStorage.setItem("passengerDetails", JSON.stringify(cleanedForm));

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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Passenger Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-800"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Age</label>

                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-800"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Gender</label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-800"
                >
                  <option value="">Select Gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Seat Preference
                </label>

                <select
                  name="seatPreference"
                  value={form.seatPreference}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-800"
                >
                  <option value="">Select Seat Preference</option>

                  <option value="Window">Window</option>

                  <option value="Aisle">Aisle</option>

                  <option value="Middle">Middle</option>
                </select>
              </div>
            </div>

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
