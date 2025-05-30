const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",       // Zoho SMTP server
  port: 465,                   // Secure port for SSL
  secure: true,                // Use SSL
  auth: {
    user: process.env.EMAIL_USER, // Your Zoho email
    pass: process.env.EMAIL_PASS, // Your Zoho app password
  },
});

exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // Should be same as `auth.user`
    to,
    subject,
    html,
  });
};
