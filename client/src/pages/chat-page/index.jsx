import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RoomSidebar from "../../components/room-sidebar";
import Chat from "../../components/chat";
import UserSidebar from "../../components/user-sidebar";

import "./styles.scss";

const ChatPage = ({ name, socket }) => {
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("General");
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  // component did mount
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");

      // socket.emit("new-user", name);
      socket.emit("join-room", "General", name);
    });

    socket.on("rooms", (rooms) => {
      console.log("rooms", rooms);

      setRooms(rooms);
    });

    socket.on("room-users", (users) => {
      console.log("users", users);
      setUsers(users);
    });

    socket.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    joinRoom("General"); // Join a defaul room
  }, []);

  const sendMessage = (message) => {
    const formattedMessage = { text: message, name };
    setMessages([...messages, message]);
    socket.emit("message", currentRoom, formattedMessage);
  };

  const joinRoom = (room) => {
    socket.emit("join-room", room, name);
    setMessages([]);
    setCurrentRoom(room);
  };

  return (
    <div className="chat-page">
      <RoomSidebar
        rooms={rooms}
        currentRoom={currentRoom}
        joinRoom={joinRoom}
      />
      <Chat
        username={name}
        currentRoom={currentRoom}
        messages={messages}
        sendMessage={sendMessage}
      />
      <UserSidebar users={users} />

      {/* <div className="chat"> */}
      {/* <div className="chat-header">
          <h1>Chat page</h1>
          <p>{"Hello " + name}</p>
          <p>{`Room: ${currentRoom.name}`}</p>
          <h4>Users: </h4>
          <ul>
            {currentRoom.users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
          <Link to="/">Go home</Link>
        </div>
        <div className="chat-box">
          <ul className="messages">
            {messages.map((message, index) => (
              <li key={index}>
                <p>
                  {message.name} : {message.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="input-container">
            <input
              type="text"
              id="input-message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default ChatPage;
