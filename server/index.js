const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

const PORT = 8080;

const users = {};

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.on("new-user", (name) => {
    users[socket.id] = name;
  });

  socket.on("join-room", (room) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on("message", (room, msg) => {
    io.to(room).emit("message", msg);
    console.log({ room, msg });

    // io.emit("message", msg);
  });
});

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
