import React, { useState } from "react";

import "./styles.scss";

const Chat = ({ username, currentRoom, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  console.log(currentRoom);

  return (
    <div className="chat">
      <div className="chat-header">
        <h1>Chat page</h1>
        <h3>{"Room: " + currentRoom}</h3>
        <p>{"Hello " + username}</p>
      </div>

      <ul className="messages">
        {messages.map((message, index) => (
          <li className="message-box" key={index}>
            <div className="author">
              <span className="name">{message.name}</span>{" "}
              <span className="time">{"13:37"}</span>
            </div>
            <p className="message">{message.text}</p>
          </li>
        ))}
      </ul>
      <div className="input-container">
        <input
          type="text"
          id="input-message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(newMessage)}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
