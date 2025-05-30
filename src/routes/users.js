const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const db = require("firebase-admin").database();

router.get("/users/me", authMiddleware, async (req, res) => {
  const userRef = db.ref(`users/${req.user.userId}`);
  const snapshot = await userRef.once("value");

  if (!snapshot.exists()) {
    return res.status(404).send("User not found");
  }

  res.send(snapshot.val());
});

module.exports = router;
