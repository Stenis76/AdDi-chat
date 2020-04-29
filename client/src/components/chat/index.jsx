import React, { useState, createRef, useEffect } from "react";

import Message from "../message";
import InputBox from "../input-box";

import "./styles.scss";

const Chat = ({ username, messages, sendMessage, emitTyping, isTypingMsg }) => {
  const ref = createRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behaviour: "smooth", block: "start" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-container">
        <ul className="messages">
          {messages.map((message, index) => (
            <Message key={index} message={message} username={username} />
          ))}
          <div
            ref={ref}
            className="anchor"
            style={{ float: "left", clear: "both" }}
          ></div>
        </ul>
        <div className="input-container">
          <p className="typing-message">{isTypingMsg}</p>
          <InputBox
            callback={sendMessage}
            emitTyping={emitTyping}
            title="send"
            type="text"
            placeholder="Write a new message"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
