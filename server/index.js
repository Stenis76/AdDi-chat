const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

const PORT = 8080;

io.on("connection", (socket) => {
  console.log("Connected to socket " + socket.id);

  socket.emit("message", { message: "Hej å välkommen " + socket.id });
});

http.listen(PORT, () => console.log("Listening to requests on port: ", PORT));
