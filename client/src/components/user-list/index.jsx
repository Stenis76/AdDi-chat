import React from "react";

import "./styles.scss";

const UserList = ({ users }) => (
  <div className="user-list">
    <h3 className="title">Users</h3>
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
