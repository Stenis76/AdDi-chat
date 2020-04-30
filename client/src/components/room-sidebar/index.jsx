import React from "react";

import RoomList from "../room-list";
import InputBoxRoom from "../input-box-room";

import "./styles.scss";

const RoomSidebar = ({ rooms, currentRoom, joinRoom }) => (
  <div className="room-sidebar">
    <header className="sidebar-header">
      <h2 className="header-title">Rooms</h2>
    </header>
    <main className="sidebar-content">
      <RoomList rooms={rooms} joinRoom={joinRoom} currentRoom={currentRoom} />
      <InputBoxRoom
        callback={joinRoom}
        title={"create"}
        type="text"
        placeholder="Write name of new room"
      />
    </main>
  </div>
);

export default RoomSidebar;
