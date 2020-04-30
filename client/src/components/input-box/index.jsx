import React, { useState, useEffect, useCallback } from "react";

import "./styles.scss";

const InputBox = ({ callback, title, placeholder, type, emitTyping }) => {
  const [input, setInput] = useState("");
  const [apiHelp, setApiHelp] = useState("");
  const submit = () => {
    if (input.length > 0) {
      const first = input.charAt(0);
      if (first === "/") {
        setApiHelp("Enter a number, or a date /dd/mm/");
        const query = input.substring(1);
        apiCall(query);
        return;
      } else {
        callback(input);
        setInput("");
        emitTyping(false);
      }
    }
  };

  const submitWithEnter = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  const [numberApi, setNumberApi] = useState([]);

  const apiCall = async (query) => {
    let res = await fetch(`http://numbersapi.com/${query}?json`);
    let response = await res.json();
    setNumberApi(response.text);
    callback(numberApi);
    setInput("");
    return;
  };

  // const apiCall = (query) => {
  //   fetch(`http://numbersapi.com/${query}?json`)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       setNumberApi(response.text);
  //       setInput("");
  //     })

  //     .catch((error) => console.log(error));
  // };

  // Backslash lyssnar på när det är dags för anrop
  //

  return (
    <div className="input-box">
      <div className="container">
        <div className="api-help-box">{apiHelp}</div>
        <input
          className="input"
          placeholder={placeholder}
          type={type}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.length > 0) {
              emitTyping(true);
            } else {
              emitTyping(false);
              console.log("skriver inte");
            }
          }}
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
