import React from "react";

import "./styles.scss";

const RoomList = ({ rooms, currentRoom, joinRoom }) => {
  if (!rooms) return <h2>Loading...</h2>;

  return (
    <div className="room-list">
      <ul>
        {rooms.map((room, index) => (
          <li
            className={`room ${currentRoom === room ? "current-room" : ""}`}
            key={index}
            onClick={() => joinRoom(room)}
          >
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
