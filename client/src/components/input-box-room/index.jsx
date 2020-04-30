import React, { useState, useEffect, useCallback } from "react";

import "./styles1.scss";

const InputBoxRoom = ({ callback, title, placeholder, type }) => {
  const [input, setInput] = useState("");
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [password, setPassword] = useState("");

  const handleClick = () => setPasswordChecked(!passwordChecked);
  console.log("password", password);

  const submit = () => {
    if (input.length > 0) {
      if (password.length > 0) {
        callback(input, password);
        setPassword("");
        setPasswordChecked(false);
      } else {
        callback(input);
      }
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
          className="input-new-room"
          placeholder={placeholder}
          type={type}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyPress={submitWithEnter}
        />

        <label className="checkbox-label">
          <input
            className="checkbox"
            onChange={handleClick}
            checked={passwordChecked}
            type="checkbox"
          />
          Password protected room?
        </label>
        {passwordChecked ? (
          <input
            className="input-password"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}
        <button className="btn primary" onClick={submit}>
          {title}
        </button>
      </div>
    </div>
  );
};

export default InputBoxRoom;
