import React, { useState } from "react";
import { Link } from "react-router-dom";

const StartPage = ({ submitName }) => {
  const [name, setName] = useState("");

  return (
    <div className="start-page">
      <h1>Start page</h1>
      <h5>Enter your name</h5>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Link to="/chat">
        <button onClick={() => submitName(name)}>Start chatting</button>
      </Link>
    </div>
  );
};

export default StartPage;
