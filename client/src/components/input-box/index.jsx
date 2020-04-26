import React, { useState } from "react";

import "./styles.scss";

const InputBox = ({ callback, title, placeholder, type }) => {
  const [input, setInput] = useState("");

  return (
    <div className="input-box">
      <div className="container">
        <input
          className="input"
          placeholder={placeholder}
          type={type}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn primary"
          onClick={() => {
            callback(input);
            setInput("");
          }}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default InputBox;
