import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RoomList from "../room-list";

import "./styles.scss";

const defaultRoom = {
  name: "General",
  users: [],
};

const ChatPage = ({ name, socket }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(defaultRoom);
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  // component did mount
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");

      // socket.emit("new-user", name);
      socket.emit("join-room", "General", name);
    });

    socket.on("rooms", (rooms) => {
      console.log("rooms", rooms);

      setRooms(rooms);
    });

    socket.on("room-users", (users) => {
      console.log("users", users);

      setCurrentRoom((prev) => ({ ...prev, users }));
    });

    socket.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    joinRoom("General"); // Join a defaul room
  }, []);

  const sendMessage = () => {
    const message = { text: input, name };
    setMessages((prevState) => [...prevState, message]);
    socket.emit("message", currentRoom.name, message);
    setInput("");
  };

  const joinRoom = (room) => {
    socket.emit("join-room", room, name);
    setMessages([]);
    setCurrentRoom({ name: room, users: [] });
  };

  return (
    <div className="chat-page">
      <div className="rooms">
        <h4>Your chat rooms</h4>
        <RoomList rooms={rooms} joinRoom={joinRoom} />
        <div>
          <p>Create a room</p>
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button
            onClick={() => {
              if (newRoomName.length > 0) {
                joinRoom(newRoomName);
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div className="chat">
        <div className="chat-header">
          <h1>Chat page</h1>
          <p>{"Hello " + name}</p>
          <p>{`Room: ${currentRoom.name}`}</p>
          <h4>Users: </h4>
          <ul>
            {currentRoom.users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
          <Link to="/">Go home</Link>
        </div>
        <div className="chat-box">
          <ul className="messages">
            {messages.map((message, index) => (
              <li key={index}>
                <p>
                  {message.name} : {message.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="input-container">
            <input
              type="text"
              id="input-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
