import React, { useState } from "react";

import Message from "../message";
import InputBox from "../input-box";

import "./styles.scss";

const Chat = ({ username, currentRoom, messages, sendMessage }) => {
  return (
    <div className="chat">
      <div className="chat-header">
        <h1>Chat page</h1>
        <h3>{"Room: " + currentRoom}</h3>
        <p>{"Hello " + username}</p>
      </div>

      <ul className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} username={username} />
        ))}
      </ul>
      <div className="input-container">
        <InputBox
          callback={sendMessage}
          title="send"
          type="text"
          placeholder="Write a new message"
        />
      </div>
    </div>
  );
};

export default Chat;
