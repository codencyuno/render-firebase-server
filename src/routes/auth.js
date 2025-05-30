// routes/auth.js
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sendMagicLink = require("../utils/sendMagicLink");
const db = require("../firebase").database();
const { v4: uuid } = require("uuid");

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
        createdAt: now,
        lastLogin: now,
        subscriptionTier: "Freemium",
        inventory: {},
        kyc: {
          status: "unverified",
          name: "",
          idImageUrl: "",
          selfieUrl: ""
        },
        notifications: {
          history: {}
        },
        history: {
          sales: [],
          withdrawals: []
        },
        settings: {
          adsEnabled: true,
          inventoryLowAlerts: true,
          newProductAlerts: true
        },
        referralCode: ""
      });
    } else {
      userId = Object.keys(snap.val())[0];
    }

    const loginToken = jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${loginToken}`);
  } catch (err) {
    res.status(400).send("⛔ Invalid or expired token");
  }
});

module.exports = router;
