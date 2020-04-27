import React from "react";

import RoomList from "../room-list";
import InputBox from "../input-box";

import "./styles.scss";

const RoomSidebar = ({ rooms, currentRoom, joinRoom }) => {
  return (
    <div className="room-sidebar">
      <header className="sidebar-header">
        <h2 className="header-title">Rooms</h2>
      </header>
      <main className="sidebar-content">
        <RoomList rooms={rooms} joinRoom={joinRoom} currentRoom={currentRoom} />
        <InputBox
          callback={joinRoom}
          title={"create"}
          type="text"
          placeholder="Write name of new room"
        />
      </main>
    </div>
  );
};

export default RoomSidebar;
