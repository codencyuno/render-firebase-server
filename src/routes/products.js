// routes/products.js
const express = require('express');
const router = express.Router();
const { getDatabase } = require('firebase-admin/database');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use serviceAccount
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
  });
}

const db = getDatabase();

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('productSet').once('value');
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No product sets found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
