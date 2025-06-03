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
      from: `"Codency Uno" <${process.env.ZMAIL_USER}>`,
      to: email,
      subject: "Welcome to Codency 🎉 Your resale journey starts now!",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Codency Uno</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 5px;
            color: #1B1B1B;
        }
        .outer-container {
            background-color: #FAFAF5;
            padding: 10px 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(176, 176, 176, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 15px;
        }
        .logo img {
            width: 120px;
            height: auto;
        }
        .button {
            text-align: center;
            margin: 25px 0;
        }
        .button a {
            background-color: #F9D43A;
            color: #1B1B1B;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .button a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(198, 146, 44, 0.3);
        }
        .content {
            line-height: 1.6;
            margin: 20px 0;
        }
        .feature-list {
            margin: 20px 0;
            padding-left: 20px;
        }
        .support {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
        .made-with-love {
            text-align: center;
            margin-top: 20px;
            color: #B0B0B0;
            font-size: 14px;
        }
        .copyright {
            text-align: center;
            margin-top: 5px;
            color: #B0B0B0;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="outer-container">
        <div class="container">
            <div class="card">
                <div class="logo">
                    <img src="https://www.codency.uno/assets/images/logo-transparent-bg.png" alt="Codency Uno Logo">
                </div>
                
                <div class="content">
                    <h2>Hi,</h2>
                    
                    <p>Welcome aboard Codency — your one-stop platform for reselling curated, high-ROI products from verified global sources like Apple, Nike, and more.</p>
                    
                    <p>Your account has been created, and your dashboard is ready!</p>
                    
                    <h3>🔑 Here's what you can do next:</h3>
                    <div class="feature-list">
                        <p>🎁 Browse premium product sets curated just for you</p>
                        <p>💸 Add funds using gift cards - zero fees</p>
                        <p>📦 Start building your resale portfolio and track real ROI</p>
                        <p>📈 Watch your wallet grow with every unit moved</p>
                    </div>
                    
                    <p>We handle the sourcing, promotion, and fulfillment — you sit back and earn.</p>
                    
                    <p>🚀 Ready to upgrade your slots and unlock bigger gains? Head to your dashboard and start exploring!</p>
                    
                    <div class="button">
                        <a href="${process.env.FRONTEND_URL}/dashboard">Visit Dashboard</a>
                    </div>
                    
                    <div class="support">
                        <p>Need help? Our support team is just a click away.<br>
                        <a href="mailto:support@codency.uno">support@codency.uno</a></p>
                    </div>
                    
                    <p>Welcome to the smarter side of reselling.</p>
                    
                    <p>— The Codency Team</p>
                </div>
            </div>
            
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
    return "Welcome email sent successfully!";
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email. Please try again.");
  }
}

module.exports = sendWelcomeEmail;
