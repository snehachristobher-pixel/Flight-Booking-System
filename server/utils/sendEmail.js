const nodemailer = require("nodemailer");

const sendEmail = async (email, bookingId, passengerName) => {
  try {
    console.log("Sending email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rock01kins@gmail.com",
        pass: "yakogtojuvzcuhxz",
      },
    });

    console.log("Sending email with:", {
      user: "rock01kins@gmail.com",
      to: email,
    });

    await transporter.sendMail({
      from: "rock01kins@gmail.com",
      to: email,
      subject: "Flight Booking Confirmation",

      html: `
        <h2>Booking Confirmed ✈️</h2>

        <p>Hello ${passengerName},</p>

        <p>Your flight booking has been confirmed.</p>

        <p><strong>Booking ID:</strong> ${bookingId}</p>

        <p>Thank you for choosing SkyJourney.</p>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;
