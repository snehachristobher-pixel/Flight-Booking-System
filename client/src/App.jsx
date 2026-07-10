import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import EditBooking from "./pages/EditBooking";

import FlightDetails from "./pages/FlightDetails";
import PassengerDetails from "./pages/PassengerDetails";
import ReviewBooking from "./pages/ReviewBooking";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";

import ProtectedRoute from "./components/ProtectedRoute";
import PaymentProcessing from "./pages/PaymentProcessing";
import Notification from "./pages/Notification";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/Profile";
import FlightStatus from "./pages/FlightStatus";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import PassengerCount from "./pages/PassengerCount";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/flights"
        element={
          <ProtectedRoute>
            <Flights />
          </ProtectedRoute>
        }
      />

      <Route
        path="/flight-details"
        element={
          <ProtectedRoute>
            <FlightDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/passenger-details"
        element={
          <ProtectedRoute>
            <PassengerDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/review-booking"
        element={
          <ProtectedRoute>
            <ReviewBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking-success"
        element={
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-processing"
        element={
          <ProtectedRoute>
            <PaymentProcessing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flight-status"
        element={
          <ProtectedRoute>
            <FlightStatus />
          </ProtectedRoute>
        }
      />
      <Route path="/edit-booking/:id" element={<EditBooking />} />
      <Route path="/passenger-count" element={<PassengerCount />} />
    </Routes>
  );
}

export default App;
