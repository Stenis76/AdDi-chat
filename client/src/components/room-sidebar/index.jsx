import React from "react";

import RoomList from "../room-list";
import InputBox from "../input-box";

import "./styles.scss";
import { useState } from "react";

const RoomSidebar = ({ rooms, currentRoom, joinRoom }) => {
  const [passwordChecked, setPasswordChecked] = useState(false);
  const handleClick = () => setPasswordChecked(!passwordChecked);

  const [password, setPassword] = useState("");

  const roomToCreate = (room) => {
    if (passwordChecked == true) {
      console.log("password is " + password);
      joinRoom(room, password);
    } else {
      joinRoom(room, null);
      console.log("no password");
    }
  };
  return (
    <div className="room-sidebar">
      <header className="sidebar-header">
        <h2 className="header-title">Rooms</h2>
      </header>
      <main className="sidebar-content">
        <RoomList rooms={rooms} joinRoom={joinRoom} currentRoom={currentRoom} />
        <InputBox
          callback={roomToCreate}
          title={"create"}
          type="text"
          placeholder="Write name of new room"
        />
        <div>
          <label htmlFor="activate-password">Password on room</label>
          <input
            onChange={handleClick}
            checked={passwordChecked}
            type="checkbox"
          />
          <input
            type="text"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </main>
    </div>
  );
};

export default RoomSidebar;
