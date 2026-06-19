const nodemailer = require("nodemailer");

const sendEmail = async (email, bookingId, passengerName) => {
  try {
    console.log("Sending email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.verify();

    console.log("SMTP Connection Successful");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✈️ Flight Booking Confirmation",

      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2 style="color:#2563eb;">
            Booking Confirmed ✈️
          </h2>

          <p>Hello <strong>${passengerName}</strong>,</p>

          <p>
            Your flight booking has been confirmed successfully.
          </p>

          <hr />

          <p>
            <strong>Booking ID:</strong>
            ${bookingId}
          </p>

          <p>
            <strong>Passenger:</strong>
            ${passengerName}
          </p>

          <p>
            Payment Status:
            <span style="color:green;">
              Paid
            </span>
          </p>

          <hr />

          <p>
            Thank you for choosing
            <strong>SkyJourney</strong>.
          </p>

          <p>
            We wish you a pleasant journey.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;
