const router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("firebase-admin").database();
const upload = require("multer")({ storage: multer.memoryStorage() }); // Use Firebase storage for production

router.post("/kyc/upload", authMiddleware, upload.fields([
  { name: "idImage" },
  { name: "selfie" }
]), async (req, res) => {
  const email = req.user.email;
  const usersRef = db.ref("users");
  const snap = await usersRef.orderByChild("email").equalTo(email).once("value");

  if (!snap.exists()) return res.status(404).send("User not found");

  const [userId] = Object.entries(snap.val())[0];

  // Save file info to DB (in real app, upload files to Firebase Storage)
  await db.ref(`users/${userId}/kyc`).set({
    status: "pending",
    name: req.body.name,
    idImageUrl: "mock-id-url",
    selfieUrl: "mock-selfie-url"
  });

  res.send("✅ KYC submitted");
});

module.exports = router;
