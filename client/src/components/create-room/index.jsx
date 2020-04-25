import React, { useState } from "react";

import "./styles.scss";

const CreateRoom = ({ joinRoom }) => {
  const [input, setInput] = useState("");

  return (
    <div className="create-room">
      <h4 className="title">Create a room</h4>
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="create-btn"
          onClick={() => {
            if (input.length > 0) {
              joinRoom(input);
            }
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
