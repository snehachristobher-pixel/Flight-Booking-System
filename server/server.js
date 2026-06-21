require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const flightRoutes = require("./routes/flightRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", flightRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Flight Booking Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
