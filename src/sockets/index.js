const { db } = require("../config/firebase");

exports.setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("send_message", async (data) => {
      const messageRef = db.ref("messages").push();
      await messageRef.set({
        text: data.text,
        timestamp: Date.now(),
      });
      io.emit("new_message", { text: data.text });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};
