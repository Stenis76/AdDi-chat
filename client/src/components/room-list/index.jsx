import React from "react";

import lock from "../../icons8-lock.svg";

import "./styles.scss";

const RoomList = ({ rooms, currentRoom, joinRoom }) => {
  if (!rooms) return <h2>Loading...</h2>;

  const handleRoomClick = (room) => {
    if (currentRoom.name === room.name) return;
    if (room.password) {
      const password = prompt("Enter password: ");
      if (room.password === password) {
        joinRoom(room.name);
      }
    } else {
      joinRoom(room.name);
    }
  };

  return (
    <div className="room-list">
      <ul>
        {rooms.map((room, index) => (
          <li
            className={`room ${
              currentRoom.name === room.name ? "current-room" : ""
            }`}
            key={index}
            onClick={() => handleRoomClick(room)}
          >
            <span className="room-name">{room.name}</span>
            {room.password && <img className="lock" src={lock} alt="" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
