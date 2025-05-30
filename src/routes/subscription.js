const router = require("express").Router();
const db = require("firebase-admin").database();
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/subscription/upgrade", authMiddleware, async (req, res) => {
  const { newTier } = req.body;
  const email = req.user.email;

  const snap = await db.ref("users").orderByChild("email").equalTo(email).once("value");
  if (!snap.exists()) return res.status(404).send("User not found");

  const [userId] = Object.entries(snap.val())[0];

  await db.ref(`users/${userId}/subscriptionTier`).set(newTier);
  res.send(`✅ Upgraded to ${newTier}`);
});

module.exports = router;
