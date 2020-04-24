import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import io from "socket.io-client";

import RoomList from "../room-list";

import "./styles.scss";

const ChatPage = ({ name }) => {
  const [socket] = useState(io("http://localhost:6800"));
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("General");
  const [rooms, setRooms] = useState([]);

  // component did mount
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");

      socket.emit("new-user", name);
      socket.emit("join-room", "General", name);
    });

    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("message", (msg) => {
      console.log("helloooooo");

      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  const sendMessage = () => {
    const message = { text: input, name };
    setMessages((prevState) => [...prevState, message]);
    socket.emit("message", room, message);
    setInput("");
  };

  return (
    <div className="chat-page">
      <RoomList rooms={rooms} />
      <div className="rooms">
        Här är rummen
        <ul>
          <li>
            <button
              onClick={(e) => {
                socket.emit("join-room", "General", name);
                setMessages([]);
                setRoom("General");
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
                setRoom("Rum 1");
              }}
            >
              Rum 1
            </button>
          </li>
        </ul>
      </div>
      <div className="chat">
        <h1>Chat page</h1>
        <p>{"Hello " + name}</p>
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

      <Link to="/">Go home</Link>
    </div>
  );
};

export default ChatPage;
