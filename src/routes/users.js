const express = require("express");
const router = express.Router();
const admin = require("../config/firebase"); // ✅ Correct relative path
const db = admin.database();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/users/me", authMiddleware, async (req, res) => {
  const { email } = req.user;
  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const userData = Object.values(snap.val())[0];
  const userResponse = {
    email: userData.email,
    balance: userData.balance,
    createdAt: userData.createdAt,
    lastLogin: userData.lastLogin,
    tier: userData.tier,
    currency: userData.currency,
    identity: userData.identity,
    iCount: userData.iCount,
    tProfits: userData.tProfits,
    pSold: userData.pSold,
    userName: userData.userName,
    country: userData.country,
    inventory: userData.inventory,
    kycStatus: userData.kycStatus,
    notifyStatus: userData.notifyStatus,
    notifications: userData.notifications,
    history: userData.history,
    referralCode: userData.referralCode
  };
  res.json(userResponse);
});

module.exports = router;
