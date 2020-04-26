import React from "react";

import RoomList from "../room-list";
import InputBox from "../input-box";

import "./styles.scss";

const RoomSidebar = ({ rooms, currentRoom, joinRoom }) => {
  return (
    <div className="room-sidebar">
      <h3>Chat rooms</h3>
      <RoomList rooms={rooms} joinRoom={joinRoom} currentRoom={currentRoom} />
      <InputBox
        callback={joinRoom}
        title={"create"}
        type="text"
        placeholder="Write name of new room"
      />
    </div>
  );
};

export default RoomSidebar;
