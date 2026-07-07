require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const flightRoutes = require("./routes/flightRoutes");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", flightRoutes);
app.use("/api/payment", paymentRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("Flight Booking Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
