const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZMAIL_USER,
    pass: process.env.ZMAIL_PASS,
  },
});

async function sendMagicLink(email, token) {
  const link = `${process.env.FRONTEND_URL}/magic-login?token=${token}`;
  try {
    await transporter.sendMail({
      from: `"Codency Uno" <${process.env.ZMAIL_USER}>`,
      to: email,
      subject: "Your Magic Login Link",
      html: `<p><a href="${link}">Click here to login</a> (expires in 15 min)</p>`,
    });
    return "Magic link sent! Please check your email.";
  } catch (error) {
    console.error("Error sending magic link:", error);
    throw new Error("Failed to send magic link. Please try again.");
  }
}

module.exports = sendMagicLink;
