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

async function sendWelcomeEmail(email) {
  try {
    await transporter.sendMail({
      from: `"Codency.Uno" <${process.env.ZMAIL_USER}>`,
      to: email,
      subject: "Welcome to Codency 🎉 Your resale journey starts now!",
      text: `Welcome to Codency Uno!

Your account has been created and your dashboard is ready. Here's what you can do:
- Browse premium product sets
- Add funds using gift cards
- Start tracking ROI as you resell top products
- Upgrade your slots for bigger gains

Visit your dashboard: ${process.env.FRONTEND_URL}/dashboard

Need help? Email us at support@codency.uno

— The Codency Team`,
      html: `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:10px; background-color:#FAFAF5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1B1B1B;">
    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:10px; padding:30px; box-shadow:0 2px 10px rgba(176,176,176,0.1);">

      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://www.codency.uno/assets/images/logo-transparent-bg.png" alt="Codency Uno Logo" style="width:120px; height:auto;">
      </div>

      <h2 style="text-align:center; font-size:20px; margin-bottom:10px;">Welcome to Codency Uno 🚀</h2>

      <p style="font-size:16px; line-height:1.6;">Hi there,</p>

      <p style="font-size:16px; line-height:1.6;">
        Welcome aboard Codency — your one-stop platform for reselling curated, high-ROI products from verified global sources like Apple, Nike, and more.
      </p>

      <p style="font-size:16px; line-height:1.6;">Your account has been created, and your dashboard is ready!</p>

      <h3 style="font-size:16px; margin-top:20px;">🔑 Here's what you can do next:</h3>

      <ul style="font-size:16px; padding-left:20px; line-height:1.6;">
        <li>🎁 Browse premium product sets curated just for you</li>
        <li>💸 Add funds using gift cards – zero fees</li>
        <li>📦 Build your resale portfolio and track real ROI</li>
        <li>📈 Watch your wallet grow with every unit sold</li>
      </ul>

      <p style="font-size:16px; line-height:1.6;">
        We handle sourcing, fulfillment, and even collaborative ad tools — so you focus on earning.
      </p>

      <p style="font-size:16px; line-height:1.6;">🚀 Ready to unlock bigger gains? Head to your dashboard now:</p>

      <div style="text-align:center; margin:25px 0;">
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color:#F9D43A; color:#1B1B1B; padding:12px 30px; text-decoration:none; border-radius:25px; font-weight:bold; display:inline-block; font-size:16px;">
          Go to Dashboard
        </a>
      </div>

      <p style="font-size:14px; text-align:center; margin-top:20px; color:#666;">
        Need help? Just reply to this email or write to us at 
        <a href="mailto:support@codency.uno" style="color:#666; text-decoration:underline;">support@codency.uno</a>.
      </p>

      <p style="font-size:16px; line-height:1.6;">Welcome to the smarter side of reselling. Let's build something great together. 💼</p>

      <p style="font-size:16px; line-height:1.6;">— The Codency Team</p>

      <p style="text-align:center; margin-top:30px; font-size:13px; color:#B0B0B0;">
        Made with 💜 in Delaware<br>
        © 2025 Codency Uno. All rights reserved.
      </p>
    </div>
  </body>
</html>
`,
    });

    return "Welcome email sent successfully!";
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email. Please try again.");
  }
}

module.exports = sendWelcomeEmail;
