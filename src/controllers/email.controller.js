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
  const { nombre, email, telefono, mensaje } = req.body;

  const to = process.env.SMTP_USER;
  const subject = `Nuevo mensaje de ${nombre}`;
  const htmlContent = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Correo electrónico:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono ? telefono : "No proporcionado"}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${mensaje}</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"SMR HeavyMaq" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
      replyTo: email
    });

    res.status(200).json({ success: true, message: "Email sent!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { sendEmail };
