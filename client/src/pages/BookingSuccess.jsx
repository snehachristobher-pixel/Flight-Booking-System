import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";

import { createFinalBooking } from "../services/bookingService";
import { reduceSeatCount } from "../services/flightService";

function BookingSuccess() {
  const navigate = useNavigate();

  const [bookingId, setBookingId] = useState("");
  const [passenger, setPassenger] = useState(null);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const id = "BK" + Math.floor(100000 + Math.random() * 900000);

    setBookingId(id);

    const storedPassenger = localStorage.getItem("passengerDetails");
    const selectedFlight = localStorage.getItem("selectedFlight");

    let passengerData = null;
    let flightData = null;

    if (storedPassenger) {
      passengerData = JSON.parse(storedPassenger);
      setPassenger(passengerData);
    }

    if (selectedFlight) {
      flightData = JSON.parse(selectedFlight);
      setFlight(flightData);
    }

    const saveBooking = async () => {
      if (!passengerData || !flightData) {
        console.log("Passenger or Flight data missing");
        return;
      }

      try {
        await createFinalBooking({
          bookingId: id,

          passengerName: passengerData.name,
          age: passengerData.age,
          gender: passengerData.gender,
          email: passengerData.email,
          phone: passengerData.phone,
          seatPreference: passengerData.seatPreference,

          flightId: flightData._id,
          seatNumber: passengerData.selectedSeat,
        });

        await reduceSeatCount(flightData._id);

        console.log("Booking saved successfully");
      } catch (error) {
        console.log("BOOKING ERROR:", error);
      }
    };

    saveBooking();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("SkyJourney Flight Ticket", 20, 20);

    doc.setFontSize(12);

    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Passenger Name: ${passenger?.name || "-"}`, 20, 50);
    doc.text(`Email: ${passenger?.email || "-"}`, 20, 60);
    doc.text(`Phone: ${passenger?.phone || "-"}`, 20, 70);
    doc.text(`Seat Preference: ${passenger?.seatPreference || "-"}`, 20, 80);
    doc.text(`Seat Number: ${passenger?.selectedSeat || "-"}`, 20, 90);

    doc.text(`Airline: ${flight?.airline || "-"}`, 20, 100);

    doc.text(
      `Route: ${flight?.source || "-"} → ${flight?.destination || "-"}`,
      20,
      110,
    );

    doc.text(`Class: ${flight?.flightClass || "-"}`, 20, 120);
    doc.text(`Price: ₹${flight?.price || "-"}`, 20, 130);
    doc.text(`Departure: ${flight?.departureTime || "-"}`, 20, 140);
    doc.text(`Arrival: ${flight?.arrivalTime || "-"}`, 20, 150);
    doc.text(`Duration: ${flight?.duration || "-"}`, 20, 160);

    doc.text("Payment Status: Paid", 20, 170);

    doc.text(`Generated On: ${new Date().toLocaleString()}`, 20, 180);

    doc.save(`Ticket-${bookingId}.pdf`);
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')",
        }}
      >
        <div className="min-h-screen bg-black/75 text-white flex items-center justify-center p-10">
          <div className="bg-slate-900/85 backdrop-blur-sm p-10 rounded-xl w-full max-w-4xl border border-slate-700">
            <div className="text-center">
              <h1 className="text-7xl mb-4">✈️</h1>

              <h2 className="text-4xl font-bold mb-2 text-green-400">
                Booking Confirmed
              </h2>

              <p className="text-slate-300 mb-8">
                Your flight has been booked successfully.
              </p>
            </div>

            {/* Booking Info */}
            <div className="bg-slate-800/80 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Booking Information</h3>

              <p>
                <strong>Booking ID:</strong> {bookingId}
              </p>

              <p>
                <strong>Payment Status:</strong> Paid ✅
              </p>
            </div>

            <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg mb-6">
              ✅ Your e-ticket has been generated successfully.
              <br />
              📄 You can download or print your ticket below.
            </div>

            {/* Passenger Details */}
            <div className="bg-slate-800/80 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Passenger Details</h3>

              <p>
                <strong>Name:</strong> {passenger?.name || "-"}
              </p>

              <p>
                <strong>Age:</strong> {passenger?.age || "-"}
              </p>

              <p>
                <strong>Gender:</strong> {passenger?.gender || "-"}
              </p>

              <p>
                <strong>Email:</strong> {passenger?.email || "-"}
              </p>

              <p>
                <strong>Phone:</strong> {passenger?.phone || "-"}
              </p>

              <p>
                <strong>Seat Preference:</strong>{" "}
                {passenger?.seatPreference || "-"}
              </p>
            </div>

            {/* Flight Details */}
            <div className="bg-slate-800/80 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Flight Details</h3>

              <p>
                <strong>Airline:</strong> {flight?.airline || "-"}
              </p>

              <p>
                <strong>Route:</strong> {flight?.source || "-"} →{" "}
                {flight?.destination || "-"}
              </p>

              <p>
                <strong>Price:</strong> ₹{flight?.price || "-"}
              </p>

              <p>
                <strong>Class:</strong> {flight?.flightClass || "-"}
              </p>

              <p>
                <strong>Departure:</strong> {flight?.departureTime || "-"}
              </p>

              <p>
                <strong>Arrival:</strong> {flight?.arrivalTime || "-"}
              </p>

              <p>
                <strong>Duration:</strong> {flight?.duration || "-"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                onClick={handlePrint}
                className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
              >
                Print Ticket
              </button>

              <button
                onClick={handleDownload}
                className="bg-orange-600 px-6 py-3 rounded-lg hover:bg-orange-700"
              >
                Download Ticket
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/bookings")}
                className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
              >
                My Bookings
              </button>
            </div>

            <div className="text-center mt-8 text-slate-300">
              Thank you for choosing SkyJourney Airlines.
              <br />
              We wish you a pleasant journey ✈️
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingSuccess;
