const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  seatsAvailable: {
    type: Number,
    default: 50,
  },

  departureTime: {
    type: String,
    required: true,
  },

  arrivalTime: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  flightClass: {
    type: String,
    default: "Economy",
  },

  airlineLogo: {
    type: String,
    default: "",
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
