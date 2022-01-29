const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen("3000", () => console.log("server is running"));

app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/public/index.html");
});
app.get("/javascript", (req, resp) => {
  resp.sendFile(__dirname + "/public/javascript.html");
});
app.get("/swift", (req, resp) => {
  resp.sendFile(__dirname + "/public/swift.html");
});
app.get("/css", (req, resp) => {
  resp.sendFile(__dirname + "/public/css.html");
});
const tech = io.of("/tech");
tech.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `New UserJoined ${data.room}`);
  });
  socket.on("message", ({ msg, room }) => {
    tech.in(room).emit("message", { manny: `data : ${msg}` });
  });
  socket.on("disconnect", ({ msg, room }) => {
    tech.in(room).emit("message", "user disconnected");
  });
});
