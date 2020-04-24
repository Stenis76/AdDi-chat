import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import io from "socket.io-client";

import RoomList from "../room-list";

import "./styles.scss";

const socket = io("http://localhost:6800");
const defaultRoom = {
  name: "General",
  users: [],
};

const ChatPage = ({ name }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(defaultRoom);
  const [rooms, setRooms] = useState([]);

  // component did mount
  useEffect(() => {
    console.log("mount");

    socket.on("connect", () => {
      console.log("Connected to server");

      socket.emit("new-user", name);
      // socket.emit("join-room", "General", name);
    });

    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("user-connected", (username, roomName) => {
      const message = {
        text: `${username} joined ${roomName}.`,
      };

      setRoom((prev) => ({ ...prev, users: [...room.users, username] }));
      setMessages((prevState) => [...prevState, message]);
    });

    socket.on("room-users", (users) => {
      setRoom((prev) => ({ ...prev, users }));
    });

    socket.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // component did unmount
    return () => {
      socket.emit("disconnect");
    };
  }, []);
  console.log("room", room);

  const sendMessage = () => {
    const message = { text: input, name };
    setMessages((prevState) => [...prevState, message]);
    socket.emit("message", room.name, message);
    setInput("");
  };

  return (
    <div className="chat-page">
      <div className="rooms">
        <h4>Your chat rooms</h4>
        <RoomList rooms={rooms} />
        <p>Click to enter or press create to make a new room</p>
        <ul>
          <li>
            <button
              onClick={(e) => {
                socket.emit("join-room", "General", name);
                setMessages([]);
                setRoom({ name: "General", users: [] });
              }}
            >
              General
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                socket.emit("join-room", "Rum 1", name);
                setMessages([]);
                setRoom({ name: "Rum 1", users: [] });
              }}
            >
              Rum 1
            </button>
          </li>
        </ul>
      </div>
      <div className="chat">
        <div className="chat-header">
          <h1>Chat page</h1>
          <p>{"Hello " + name}</p>
          <p>{`Room: ${room.name}`}</p>
          <h4>Users: </h4>
          <ul>
            {room.users.map((user, index) => (
              <li key={index}>{user}</li>
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
