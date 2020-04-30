import React from "react";

import "./styles.scss";

const UserList = ({ users, username }) => (
  <div className="user-list">
    <ul>
      {users.map((user) => (
        <li
          className={`user ${user.name === username ? "current-user" : ""}`}
          key={user.id}
        >
          <span className="status"></span>
          <span className="name">{user.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
