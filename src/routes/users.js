
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

// ✅ Update userName (step 2 of onboarding)
router.post("/users/update", authMiddleware, async (req, res) => {
  const { email } = req.user;
  const { userName } = req.body;

  if (!userName) return res.status(400).send("userName is required");

  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const userKey = Object.keys(snap.val())[0];
  await db.ref(`users/${userKey}`).update({ userName: userName });
  res.status(200).send("Username updated");
});

// ✅ Mark onboarding complete (step 3)
router.post("/users/onboard", authMiddleware, async (req, res) => {
  const { email } = req.user;

  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const userKey = Object.keys(snap.val())[0];
  await db.ref(`users/${userKey}`).update({ identity: "old" });

  res.status(200).send("Onboarding complete");
});

// Currency Update
router.post("/users/currency", authMiddleware, async (req, res) => {
  const { email } = req.user;
  const { currency } = req.body;

  if (!currency) return res.status(400).send("currency is required");

  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const userKey = Object.keys(snap.val())[0];
  await db.ref(`users/${userKey}`).update({ currency: currency });
  res.status(200).send("Currency updated");
});

module.exports = router;
