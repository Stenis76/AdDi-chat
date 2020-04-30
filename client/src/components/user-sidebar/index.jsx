import React from "react";

import UserList from "../user-list";

import "./styles.scss";

const UserSidebar = ({ users, username }) => {
  return (
    <div className="user-sidebar">
      <header className="sidebar-header">
        <h2 className="title">Users</h2>
      </header>
      <UserList users={users} username={username} />
    </div>
  );
};

export default UserSidebar;
