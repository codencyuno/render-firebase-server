const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const { setupSockets } = require("./sockets");
require("dotenv").config();

app.use("/api", authRoutes); // mounts /api/auth/request

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

setupSockets(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
