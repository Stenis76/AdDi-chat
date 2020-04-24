import React from "react";

const RoomList = ({ rooms }) => {
  if (!rooms) return <h2>Loading...</h2>;
  // console.log("rooms", rooms);

  return (
    <div className="room-list">
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
