const router = require("express").Router();
const { db } = require("../config/firebase");
const { authMiddleware } = require("../middlewares/auth");
const upload = require("../utils/upload");

// Public

router.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});

// Authenticated route
router.get("/messages", authMiddleware, async (_, res) => {
  const snapshot = await db.ref("messages").once("value");
  res.json(snapshot.val());
});

// Save message
router.post("/messages", async (req, res) => {
  const ref = db.ref("messages").push();
  await ref.set({ text: req.body.text, timestamp: Date.now() });
  res.status(201).json({ id: ref.key });
});

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.json({ message: "Received file", fileName: file.originalname });
});

module.exports = router;
