import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import StartPage from "./components/start-page";
import ChatPage from "./components/chat-page";

import "./App.css";

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <StartPage submitName={setName} />
        </Route>
        <Route path="/chat">
          {!name ? <Redirect to="/" /> : <ChatPage name={name} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
