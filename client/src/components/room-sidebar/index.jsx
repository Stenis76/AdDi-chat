import React from "react";

import RoomList from "../room-list";
import CreateRoom from "../create-room";

import "./styles.scss";

const RoomSidebar = ({ rooms, currentRoom, joinRoom }) => {
  return (
    <div className="room-sidebar">
      <h3>Chat rooms</h3>
      <RoomList rooms={rooms} joinRoom={joinRoom} currentRoom={currentRoom} />
      <CreateRoom joinRoom={joinRoom} />
    </div>
  );
};

export default RoomSidebar;
