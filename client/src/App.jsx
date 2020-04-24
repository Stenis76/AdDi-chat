import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import StartPage from "./components/start-page";
import ChatPage from "./components/chat-page";

import io from "socket.io-client";

// import "./App.css";

const socket = io("ws://localhost:6800");

function App() {
  const [name, setName] = useState("");

  const submitName = (name) => {
    setName(name);
    socket.emit("new-user", name);
  };

  useEffect(() => {
    // component did unmount
    return () => {
      socket.emit("disconnect");
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <StartPage submitName={submitName} />
        </Route>
        <Route path="/chat">
          {!name ? (
            <Redirect to="/" />
          ) : (
            <ChatPage name={name} socket={socket} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
