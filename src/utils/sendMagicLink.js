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
  const link = `${process.env.BACKEND_URL}/auth/verify?token=${token}`;
  try {
    await transporter.sendMail({
      from: `"Codency Uno" <${process.env.ZMAIL_USER}>`,
      to: email,
      subject: "Your Magic Login Link",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codency Uno Magic Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #FAFAF5;
            margin: 0;
            padding: 20px;
            color: #1B1B1B;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(176, 176, 176, 0.1);
        }
        .logo {
            margin-bottom: 15px;
        }
        .logo img {
            width: 120px;
            height: auto;
        }
        .magic-link {
            margin: 15px 0;
        }
        .magic-link a {
            background-color: #F9D43A;
            color: #1B1B1B;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .magic-link a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(198, 146, 44, 0.3);
        }
        .footer {
            margin-top: 10px;
            color: #B0B0B0;
            font-size: 14px;
        }
        .help-text {
            margin-top: 20px;
            margin-bottom: 10px;
            color: #666;
            font-size: 14px;
        }
        .copyright {
            margin-top: 5px;
            color: #B0B0B0;
            font-size: 12px;
        }
        .social-icons {
            margin: 10px 0;
        }
        .social-icons a {
            text-decoration: none;
            color: #1B1B1B;
            margin: 0 10px;
            font-size: 12px;
        }
        .social-icons a:not(:last-child):after {
            content: '|';
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://www.codency.uno/assets/images/logo-invisible.png" alt="Codency Uno Logo" style="width: 120px; height: auto; margin-bottom: 15px;">
        
        <div class="magic-link">
            <h2>Please verify your email</h2>
            <p>Click the button below to access your account.</p>
            <p>You can manage your content here.</p>
            <p><a href="${link}">Verify</a></p>
            <p style="color: #B0B0B0; font-size: 13px;">(expires in 15 min)</p>
        </div>

        <div class="help-text">
            Need some help? Just reply to this email.
        </div>
          <div class="social-icons">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
          </div>
          
          <div class="footer">
              <div class="made-with-love">
                  Made with <span>💜</span> in Delaware
              </div>
              <div class="copyright">
                © Codency.uno
            </div>
          </div>
    </div>
</body>
</html>`,
    });
    return "Magic link sent! Please check your email.";
  } catch (error) {
    console.error("Error sending magic link:", error);
    throw new Error("Failed to send magic link. Please try again.");
  }
}

module.exports = sendMagicLink;
