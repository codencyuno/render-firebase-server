// routes/auth.js
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sendMagicLink = require("../utils/sendMagicLink");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

const admin = require("../config/firebase");
const db = admin.database();
const { v4: uuid } = require("uuid");

router.post("/auth/request", async (req, res) => {
  const { email } = req.body;
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const message = await sendMagicLink(email, token);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/auth/verify", async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const usersRef = db.ref("users");
    const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

    let userId;

    if (!snap.exists()) {
      userId = uuid();
      const now = Date.now();

      await db.ref(`users/${userId}`).set({
        email,
        balance: 0,
        createdAt: now,
        lastLogin: now,
        tier: 1,
        currency: 1,
        identity: "new",
        iCount: 0,
        tProfits: 0,
        pSold: 0,
        userName: "New User",
        country: "United States",
        inventory: {},
        kycStatus: "unverified",
        notifyStatus: "true",
        notifications: {
          history: {
            "welcome-message": {
              title: "🎉 Welcome to Codency!",
              body: "Your account is live and ready. Start building your portfolio with verified products, watch your ROI grow, and upgrade anytime. Need help? We've got you. Let's go!",
              timestamp: now,
              read: false
            }
          }
        },        
        
        history: {
          deposits: [],
          sales: [],
          withdrawals: []
        },
        referralCode: ""
      });

      await sendWelcomeEmail(email);
    } else {
      userId = Object.keys(snap.val())[0];
      // Update last login time for existing user
      const now = Date.now();
      await db.ref(`users/${userId}`).update({
        lastLogin: now
      });
    }

    const loginToken = jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`${process.env.FRONTEND_URL}?token=${loginToken}`);
  } catch (err) {
    res.status(400).send("⛔ Invalid or expired token");
  }
});

module.exports = router;
