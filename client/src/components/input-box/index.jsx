import React, { useState, useEffect, useCallback } from "react";

import "./styles.scss";

const InputBox = ({ callback, title, placeholder, type, emitTyping }) => {
  const [input, setInput] = useState("");
  const [apiHelp, setApiHelp] = useState("");
  const submit = () => {
    if (input.length > 0) {
      const first = input.charAt(0);
      if (first === "/") {
        const query = input.substring(1);
        apiCall(query);
        setApiHelp("");
      } else {
        callback(input);
      }

      emitTyping(false);
      setInput("");
    }
  };

  const submitWithEnter = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const apiCall = async (query) => {
    let res = await fetch(`http://numbersapi.com/${query}?json`);
    let response = await res.json();

    callback(response.text);
    setInput("");

    return response;
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      emitTyping(true);
    } else {
      emitTyping(false);
    }

    if (e.target.value[0] === "/") {
      setApiHelp("Enter a number, or a date /dd/mm/");
    } else {
      setApiHelp("");
    }
  };

  return (
    <div className="input-box">
      <div className="container">
        <div className="api-help-box">{apiHelp}</div>
        <input
          className="input"
          placeholder={placeholder}
          type={type}
          value={input}
          onChange={handleChange}
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
