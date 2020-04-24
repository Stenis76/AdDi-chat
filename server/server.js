const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

const PORT = 6800;

const users = {};

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.on("new-user", (name) => {
    users[socket.id] = name;
    console.log("new user");
  });

  socket.emit("rooms", Object.keys(socket.rooms)); // kanske ta bort

  socket.on("join-room", (roomName, name) => {
    // leave previous room before joining new one

    socket.leaveAll();

    socket.join(roomName, () => {
      //
      io.emit("rooms", Object.keys(socket.rooms));
      socket.to(roomName).emit("user-connected", name, roomName);

      socket.emit("room-users", getUsernames(roomName));
    });
  });

  socket.on("message", (roomName, msg) => {
    socket.to(roomName).emit("message", msg);
  });

  socket.on("disconnect", () => {
    socket.leaveAll();
    socket.disconnect();
  });
});

// function leaveRoom(socket) {
//   const roomToLeave = getUsersRoom(socket);

//   if (roomToLeave && socket) {
//     delete rooms[roomToLeave].users[socket.id];

//     if (JSON.stringify(rooms[roomToLeave].users) === "{}") {
//       delete rooms[roomToLeave];
//     }
//   }
// }

// function getUsersRoom(socket) {
//   const roomEntry = Object.entries(rooms).find(
//     (entry) => entry[1].users[socket.id]
//   );
//   if (roomEntry) return roomEntry[0];
//   return;

function getUsernames(roomName) {
  const userIdsObject = io.sockets.adapter.rooms[roomName].sockets;
  const userIdsArray = Object.keys(userIdsObject);
  const usernames = userIdsArray.map((id) => users[id]);
  console.log("users", users);

  console.log("usernames", usernames);

  return usernames;
}

function findRooms() {
  var availableRooms = [];
  var rooms = io.sockets.adapter.rooms;
  if (rooms) {
    for (var room in rooms) {
      if (!rooms[room].hasOwnProperty(room)) {
        availableRooms.push(room);
      }
    }
  }
  return availableRooms;
}

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
