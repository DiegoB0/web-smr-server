import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"SMR HeavyMaq" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Email sent!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { sendEmail };  // Export sendEmail function
