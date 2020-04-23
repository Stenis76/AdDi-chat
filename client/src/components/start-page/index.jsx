import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const StartPage = ({ submitName }) => {
  const [name, setName] = useState("");

  return (
    <div className="start-page">
      <div className="log-in">
        <h1>ADDI-chat</h1>
        <h5>Enter your name to start chatting</h5>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Link to="/chat">
          <button onClick={() => submitName(name)}>Log-on</button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
