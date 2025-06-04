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
  const link = `${process.env.BACKEND_URL}/api/auth/verify?token=${token}`;
  try {
    await transporter.sendMail({
      from: `"Codency Uno" <${process.env.ZMAIL_USER}>`,
      to: email,
      replyTo: 'support@codency.uno',
      subject: "Please verify your email",
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@codency.uno>, <https://www.codency.uno/unsubscribe>'
      },
      text: `Please verify your email by clicking on this link: ${link}. You're almost there — just click to confirm your account. This link expires in 15 minutes.`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Codency Uno Verification Link</title>
</head>
<body style="margin:0; padding:10px; background-color:#FAFAF5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1B1B1B;">
  <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:10px; padding:30px; box-shadow:0 2px 10px rgba(176,176,176,0.1);">
    
    <div style="text-align:center; margin-bottom:20px;">
      <img src="https://www.codency.uno/assets/images/logo-transparent-bg.png" alt="Codency Uno Logo" style="width:120px; height:auto;">
    </div>

    <h2 style="text-align:center; font-size:20px; margin-bottom:10px;">Welcome to Codency Uno 🚀</h2>
    <p style="text-align:center; font-size:16px; margin-top:0;">You're almost in! Click the button below to verify your email and activate your account.</p>

    <div style="text-align:center; margin:25px 0;">
      <a href="${link}" style="background-color:#F9D43A; color:#1B1B1B; padding:12px 30px; text-decoration:none; border-radius:25px; font-weight:bold; display:inline-block; font-size:16px;">
        Confirm My Account
      </a>
    </div>

    <p style="text-align:center; font-size:13px; color:#888;">This link will expire in 15 minutes to keep your account secure.</p>

    <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

    <p style="font-size:14px; color:#333; line-height:1.6;">
      Codency Uno helps you earn by reselling premium products from brands like Apple and Nike. Build your store, access inventory, and grow your income — all in one dashboard.
    </p>

    <p style="font-size:14px; color:#333; line-height:1.6;">
      If you didn't request this email, you can safely ignore it. But if you're curious, we’d love to have you on board. 👀
    </p>

    <p style="font-size:14px; text-align:center; margin-top:30px; color:#666;">
      Need help? Just reply to this email or contact us at <a href="mailto:support@codency.uno" style="color:#666; text-decoration:underline;">support@codency.uno</a>.
    </p>

    <p style="text-align:center; margin-top:30px; font-size:13px; color:#B0B0B0;">
      Made with 💜 in Delaware
    </p>
    <p style="text-align:center; font-size:12px; color:#B0B0B0; margin-top:5px;">
      © 2025 Codency Uno. All rights reserved.
    </p>
  </div>
</body>
</html>
`,
    });
    return "Magic link sent! Please check your email.";
  } catch (error) {
    console.error("Error sending magic link:", error);
    throw new Error("Failed to send magic link. Please try again.");
  }
}

module.exports = sendMagicLink;
