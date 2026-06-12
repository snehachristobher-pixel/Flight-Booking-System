const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
  },

  passengerName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },

  seatPreference: {
    type: String,
  },

  userId: {
    type: String,
    required: true,
  },

  flightId: {
    type: String,
    required: true,
  },

  seatNumber: {
    type: String,
    required: true,
  },

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  status: {
    type: String,
    default: "Confirmed",
  },

  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
