const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://snehachristobher_db_user:Flight123@cluster0.rioi46s.mongodb.net/flight-booking-db?retryWrites=true&w=majority&appName=Cluster0",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};  

module.exports = connectDB;
