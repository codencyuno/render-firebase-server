// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("👋 Hello! This is the root of your server.");
});

// ❌ REMOVE THIS LINE:
// app.use("/api", require("./routes"));

module.exports = app;
