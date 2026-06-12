const nodemailer = require("nodemailer");

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rock01kins@gmail.com",
        pass: "yakogtojuvzcuhxz",
      },
    });

    await transporter.sendMail({
      from: "rock01kins@gmail.com",
      to: "rock01kins@gmail.com",
      subject: "Flight Booking Test",
      text: "Email test successful!",
    });

    console.log("SUCCESS - Email sent");
  } catch (error) {
    console.log(error);
  }
}

test();
