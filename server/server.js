const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

const PORT = 6800;

const rooms = {};

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.on("join-room", (room, name) => {
    // leave previous room before joining new one
    const roomToLeave = getUsersRoom(socket);
    if (roomToLeave) {
      leaveRoom(roomToLeave);
    }

    // check if room already exists
    if (rooms[room]) {
      rooms[room].users[socket.id] = name;
    } else {
      // create a new room
      rooms[room] = { users: { [socket.id]: name } };
    }

    socket.leaveAll();
    socket.join(room);
    socket.to(room).emit("user-connected", name);
  });

  socket.on("message", (room, msg) => {
    socket.to(room).emit("message", msg);
  });

  socket.on("disconnect", () => {
    const roomToLeave = getUsersRoom(socket);
    if (roomToLeave) {
      leaveRoom(roomToLeave);
    }
  });
});

// const rooms = {
//   "rum 1" : {
//     users: {
//       "sd123" : "Adam",
//       "klk23" : "Dick"
//     }
//   },
//   "rum 2" : {
//     users: {
//       "sad33" : "David",
//       "lk32l" : "Victor"
//     }
//   }
// }

function leaveRoom(roomToLeave) {
  if (roomToLeave) {
    delete rooms[roomToLeave].users[socket.id];

    if (JSON.stringify(rooms[roomToLeave].users) === "{}") {
      delete rooms[roomToLeave];
    }
  }
}

function getUsersRoom(socket) {
  const roomEntry = Object.entries(rooms).find(
    (entry) => entry[1].users[socket.id]
  );
  if (roomEntry) return roomEntry[0];
  return;
}

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
