router.get("/dashboard", async (req, res) => {
  try {
    const totalFlights = await Flight.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const confirmedBookings = await Booking.countDocuments({
      status: "Confirmed",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "Cancelled",
    });

    const bookings = await Booking.find();

    const totalRevenue = bookings.length * 5000;

    res.json({
      totalFlights,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
