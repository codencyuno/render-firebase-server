const router = require("express").Router();
const db = require("firebase-admin").database();
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/inventory", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const email = req.user.email;

  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const [userId, userData] = Object.entries(snap.val())[0];

  // Check subscription limit logic here
  const currentInventory = userData.inventory || {};
  const limitMap = {
    Freemium: 1,
    Starter: 10,
    Growth: 25,
    Pro: 50,
    Elite: 20,
    Titan: 5
  };

  const currentCount = Object.keys(currentInventory).length;
  const maxAllowed = limitMap[userData.subscriptionTier || "Freemium"];
  if (currentCount >= maxAllowed) {
    return res.status(403).send("Upgrade your subscription to add more products");
  }

  // Add to inventory
  await db.ref(`users/${userId}/inventory/${productId}`).set({
    status: "In Stock",
    addedAt: Date.now()
  });

  res.send("✅ Product added to inventory");
});

module.exports = router;
