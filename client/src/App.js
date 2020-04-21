import React, { useEffect } from "react";

import io from "socket.io-client";

import "./App.css";

function App() {
  // component did mount
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  );
}

export default App;
