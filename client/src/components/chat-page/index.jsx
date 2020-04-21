import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import io from "socket.io-client";

const ChatPage = ({ name }) => {
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // component did mount
  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, [socket]);

  const sendMessage = () => {
    const message = { text: input, name };

    socket.emit("message", message);
    setInput("");
  };

  return (
    <div className="chat-page">
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
      <Link to="/">Go home</Link>
    </div>
  );
};

export default ChatPage;
