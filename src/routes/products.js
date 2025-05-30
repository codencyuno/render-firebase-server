const router = require("express").Router();
const db = require("firebase-admin").database();
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/products", authMiddleware, async (req, res) => {
  const email = req.user.email;
  const snap = await db.ref("users").orderByChild("email").equalTo(email).once("value");
  const [userId, userData] = Object.entries(snap.val())[0];

  const tier = userData.subscriptionTier || "Freemium";

  const allProductsSnap = await db.ref("products").once("value");
  const products = Object.values(allProductsSnap.val() || {}).filter(p => {
    const allowedTiers = ["Freemium", "Starter", "Growth", "Pro", "Elite", "Titan"];
    return allowedTiers.indexOf(tier) >= allowedTiers.indexOf(p.requiredTier);
  });

  res.json(products);
});

module.exports = router;
