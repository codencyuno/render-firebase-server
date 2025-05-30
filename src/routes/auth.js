const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sendMagicLink = require("../utils/sendMagicLink");
const db = require("firebase-admin").database();

router.get("/auth/verify", async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const userRef = db.ref("users");
    const snapshot = await userRef.orderByChild("email").equalTo(email).once("value");

    let userId;
    if (snapshot.exists()) {
      userId = Object.keys(snapshot.val())[0]; // get user ID
    } else {
      const newUserRef = userRef.push();
      userId = newUserRef.key;
      await newUserRef.set({ email, createdAt: Date.now() });
    }

    // Generate full login token
    const loginToken = jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${loginToken}`);
  } catch (err) {
    res.status(400).send("⛔ Invalid or expired token");
  }
});
