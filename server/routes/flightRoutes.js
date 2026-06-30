const express = require("express");
const router = express.Router();

const Flight = require("../models/Flight");
const Booking = require("../models/Booking");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/flights/bulk", async (req, res) => {
  try {
    const flights = await Flight.insertMany(req.body);

    res.status(201).json(flights);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find();

    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/flights/:id", async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Flight deleted successfully",
      deletedFlight,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/flights/:id", async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/bookings", auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      passengerName: req.body.passengerName,
      userId: req.user.id,
      flightId: req.body.flightId,
      seatNumber: req.body.seatNumber,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/bookings/:id", auth, async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id);

    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    console.log("RESULT:", deletedBooking);

    res.status(200).json({
      message: "Booking deleted successfully",
      deletedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/bookings/:id", auth, async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        passengerName: req.body.passengerName,
        flightId: req.body.flightId,
        seatNumber: req.body.seatNumber,
        status: req.body.status,
      },
      { new: true },
    );

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/bookings/final", auth, async (req, res) => {
  console.log("FINAL BOOKING API HIT");
  try {
    const booking = await Booking.create({
      bookingId: req.body.bookingId,
      passengerName: req.body.passengerName,
      age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      seatPreference: req.body.seatPreference,
      userId: req.user.id,
      flightId: req.body.flightId,
      seatNumber: req.body.seatNumber,
      paymentStatus: "Paid",
      status: "Confirmed",
    });

    console.log("Booking created");

    await sendEmail(req.body.email, req.body.bookingId, req.body.passengerName);

    console.log("Email function completed");

    res.status(201).json(booking);
  } catch (error) {
    console.log("BOOKING FINAL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/dashboard/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 }).limit(10);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/users", async (req, res) => {
  try {
    const existingEmail = await User.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const existingName = await User.findOne({
      name: req.body.name,
    });

    if (existingName) {
      return res.status(400).json({
        message: "Name already used. Try another name.",
      });
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/flights/:id/seats", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
      });
    }

    if (flight.seatsAvailable <= 0) {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    flight.seatsAvailable -= 1;

    await flight.save();

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/dashboard", async (req, res) => {
  try {
    const totalFlights = await Flight.countDocuments();

    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();

    const confirmedBookings = await Booking.countDocuments({
      status: "Confirmed",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "Cancelled",
    });

    const bookings = await Booking.find();

    const totalRevenue = bookings.length * 5000;

    const averageBookingValue =
      totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

    const cancellationRate =
      totalBookings > 0
        ? ((cancelledBookings / totalBookings) * 100).toFixed(2)
        : 0;

    res.json({
      totalFlights,
      totalBookings,
      totalUsers,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      averageBookingValue,
      cancellationRate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail("rock01kins@gmail.com", "TEST123", "Sneha");

    res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
