import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import QRCode from "qrcode";
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

          passengers: passengerData.passengers,

          email: passengerData.email,
          phone: passengerData.phone,

          flightId: flightData._id,
        });
        for (let i = 0; i < Number(passengerData.passengerCount); i++) {
          await reduceSeatCount(flightData._id);
        }

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

  const handleDownload = async () => {
    const doc = new jsPDF();
    const qrData = `
Booking ID: ${bookingId}
Passengers: ${passenger?.passengerCount}
Airline: ${flight?.airline}
Route: ${flight?.source} - ${flight?.destination}
Status: Confirmed
`;

    const qrImage = await QRCode.toDataURL(qrData);

    doc.setFontSize(20);
    doc.text("SkyJourney Flight Ticket", 20, 20);

    doc.setFontSize(12);

    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Email: ${passenger?.email || "-"}`, 20, 50);
    doc.text(`Phone: ${passenger?.phone || "-"}`, 20, 60);

    let y = 80;

    passenger?.passengers?.forEach((person, index) => {
      doc.text(
        `Passenger ${index + 1}: ${person.name} | Seat: ${person.selectedSeat}`,
        20,
        y,
      );

      y += 10;
    });

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

    doc.setTextColor(0, 128, 0);
    doc.text("Payment Status: PAID ✓", 20, 170);
    doc.setTextColor(0, 0, 0);
    doc.text(`Booking Date: ${new Date().toLocaleDateString()}`, 20, 175);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 20, 180);
    doc.addImage(qrImage, "PNG", 140, 30, 40, 40);

    doc.setFontSize(10);
    doc.text("Scan QR for Ticket Details", 125, 75);
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

              <p className="mb-4">
                <strong>Total Passengers:</strong>{" "}
                {passenger?.passengerCount || 1}
              </p>

              <p className="mb-2">
                <strong>Email:</strong> {passenger?.email || "-"}
              </p>

              <p className="mb-4">
                <strong>Phone:</strong> {passenger?.phone || "-"}
              </p>

              {passenger?.passengers?.map((person, index) => (
                <div
                  key={index}
                  className="border border-slate-600 rounded-lg p-4 mb-4"
                >
                  <h4 className="font-bold text-lg mb-2">
                    Passenger {index + 1}
                  </h4>

                  <p>Name: {person.name}</p>
                  <p>Age: {person.age}</p>
                  <p>Gender: {person.gender}</p>
                  <p>Seat Preference: {person.seatPreference}</p>
                  <p>Seat Number: {person.selectedSeat}</p>
                </div>
              ))}
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
                <strong>Total Fare:</strong> ₹
                {(flight?.price || 0) * Number(passenger?.passengerCount || 1) +
                  500}
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
