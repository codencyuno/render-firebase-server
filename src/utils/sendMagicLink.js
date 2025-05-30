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
  await transporter.sendMail({
    from: `"Login Bot" <${process.env.ZMAIL_USER}>`,
    to: email,
    subject: "Your Magic Login Link",
    html: `<p><a href="${link}">Click here to login</a> (expires in 15 min)</p>`,
  });
}

module.exports = sendMagicLink;
