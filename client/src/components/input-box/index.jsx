import React, { useState, useEffect, useCallback } from "react";

import "./styles.scss";

const InputBox = ({ callback, title, placeholder, type }) => {
  const [input, setInput] = useState("");

  const submit = () => {
    if (input.length > 0) {
      callback(input);
      setInput("");
    }
  };

  const submitWithEnter = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="input-box">
      <div className="container">
        <input
          className="input"
          placeholder={placeholder}
          type={type}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={submitWithEnter}
        />
        <button className="btn primary" onClick={submit}>
          {title}
        </button>
      </div>
    </div>
  );
};

export default InputBox;
