const express = require("express");
const router = express.Router();
const db = require("../firebase").database();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/users/me", authMiddleware, async (req, res) => {
  const { email } = req.user;
  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const userData = Object.values(snap.val())[0];
  res.json(userData);
});

module.exports = router;
