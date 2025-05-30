const multer = require("multer");
const storage = multer.memoryStorage(); // Save in RAM (or use diskStorage)
const upload = multer({ storage });

module.exports = upload;
