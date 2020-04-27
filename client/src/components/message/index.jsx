import React from "react";

import "./styles.scss";

const Message = ({ message, username }) => (
  <li className={`message ${message.name === username ? "my-message" : ""}`}>
    <div className="author">
      <span className="name">{message.name}</span>{" "}
      <span className="time">{"13:37"}</span>
    </div>
    <p className="text">{message.text}</p>
  </li>
);

export default Message;
