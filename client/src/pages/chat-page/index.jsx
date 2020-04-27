import React, { useEffect, useState } from "react";

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
      // add new message
      setMessages((prevState) => [...prevState, msg]);
    });

    socket.on("wrong-password", (msg) => {
      console.log(msg);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    joinRoom("General", null); // Join a defaul room
  }, []);

  const sendMessage = (message) => {
    const formattedMessage = { text: message, name };
    setMessages((prev) => [...prev, formattedMessage]);
    socket.emit("message", currentRoom, formattedMessage);
  };

  const joinRoom = (room, password) => {
    socket.emit("join-room", room, name, password);
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
    </div>
  );
};

export default ChatPage;
