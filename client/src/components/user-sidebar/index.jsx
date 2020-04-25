import React from "react";

import UserList from "../user-list";

import "./styles.scss";

const UserSidebar = ({ users }) => {
  return (
    <div className="user-sidebar">
      <UserList users={users} />
    </div>
  );
};

export default UserSidebar;
