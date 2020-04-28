const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const {
  userJoin,
  userLeave,
  getUser,
  getRoomUsers,
  getRooms,
} = require("./users");

const PORT = 6800;

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.on("join-room", (room, name) => {
    // leave previous room before joining new one
    console.log("new room", room);

    leaveRoom(socket);
    // then join room
    joinRoom(socket, name, room);
  });

  // broadcast message to all clients in a given room
  socket.on("message", (roomName, message) => {
    socket.broadcast.to(roomName).emit("message", message);
    console.log("get rooms", getRooms());
  });

  socket.on("user-typing", (msg, roomName) => {
    socket.broadcast.to(roomName).emit("user-typing", msg);
  });

  socket.on("disconnect", () => {
    leaveRoom(socket);
    socket.disconnect();
  });
});

function leaveRoom(socket) {
  const user = userLeave(socket.id);
  if (user) {
    console.log(`${user.name} left room ${user.room}.`);
    // broadcast user leaving message to room
    socket.broadcast.to(user.room).emit("message", {
      name: "ChatBot",
      text: `${user.name} left ${user.room}`,
    });
    // broadcast that the user left the room
    // and send the updated list of room users
    socket.broadcast.to(user.room).emit("room-users", getRoomUsers(user.room));
  }
  socket.leaveAll(); // make sure we leave socket.io rooms
}

function joinRoom(socket, name, room) {
  // save user on server
  const user = userJoin(socket.id, name, room);
  if (!user) {
    socket.emit("wrong-password", "Wrong password");
    return;
  }

  // join socket.io room
  socket.join(room.name, () => {
    // broadcast possible room update to everyone in room
    io.emit("rooms", getRooms());
    // send welcome message to user
    socket.emit("message", {
      name: "ChatBot",
      text: `Welcome to room "${room.name}"`,
    });
    // broadcast user connected message to the room
    socket.broadcast.to(room.name).emit("message", {
      name: "ChatBot",
      text: `${name} joined "${room.name}"`,
    });
    // send the rooms users to the client who joined
    io.in(room.name).emit("room-users", getRoomUsers(room.name));
  });
}

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
