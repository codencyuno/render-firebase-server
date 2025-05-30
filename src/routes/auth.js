const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sendMagicLink = require("../utils/sendMagicLink");
const db = require("firebase-admin").database();

router.post("/auth/request", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");

  // If user doesn't exist → create
  const userRef = db.ref("users");
  const snapshot = await userRef.orderByChild("email").equalTo(email).once("value");

  if (!snapshot.exists()) {
    const newUserRef = userRef.push();
    await newUserRef.set({ email, createdAt: Date.now() });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
  await sendMagicLink(email, token);

  res.send("✅ Magic link sent!");
});

router.get("/auth/verify", async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?email=${encodeURIComponent(email)}`);
  } catch {
    res.status(400).send("⛔ Invalid or expired token");
  }
});

module.exports = router;
