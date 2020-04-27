const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const {
  userJoin,
  userLeave,
  getUser,
  getRoomUsers,
  getAllRooms,
  getRooms,
} = require("./users");

const PORT = 6800;

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.on("join-room", (room, name, password) => {
    // leave previous room before joining new one
    leaveRoom(socket);
    // then join room
    joinRoom(socket, name, room, password);
  });

  // broadcast message to all clients in a given room
  socket.on("message", (room, message) => {
    socket.broadcast.to(room).emit("message", message);
    console.log("get rooms", getRooms());
  });

  socket.on("disconnect", () => {
    leaveRoom(socket);
    socket.disconnect();
  });
});

function leaveRoom(socket) {
  const user = userLeave(socket.id);
  if (user) {
    console.log(`${user.name} disconnected from server.`);
    // broadcast user leaving message to room
    socket.broadcast.to(user.Name).emit("message", {
      name: "ChatBot",
      text: `${user.name} left ${user.roomName}`,
    });
    // broadcast that the user left the room
    // and send the updated list of room users
    socket.broadcast
      .to(user.roomName)
      .emit("room-users", getRoomUsers(user.roomName));
  }
  socket.leaveAll(); // make sure we leave socket.io rooms
}

function joinRoom(socket, name, roomName, password) {
  // save user on server
  const user = userJoin(socket.id, name, roomName, password);
  if (!user) {
    socket.emit("wrong-password", "Wrong password");
    return;
  }
  console.log("user", user);

  // join socket.io room
  socket.join(roomName, () => {
    // broadcast possible room update to everyone in room
    io.emit("rooms", getAllRooms());
    // send welcome message to user
    socket.emit("message", {
      name: "ChatBot",
      text: `Welcome to room "${roomName}"`,
    });
    // broadcast user connected message to the room
    socket.broadcast.to(roomName).emit("message", {
      name: "ChatBot",
      text: `${name} joined "${roomName}"`,
    });
    // send the rooms users to the client who joined
    io.in(roomName).emit("room-users", getRoomUsers(roomName));
  });
}

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
