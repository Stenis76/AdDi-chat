import React from "react";

import "./styles.scss";

const UserList = ({ users }) => (
  <div className="user-list">
    <ul>
      {users.map((user) => (
        <li className="user" key={user.id}>
          <span className="status"></span>
          <span className="name">{user.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
