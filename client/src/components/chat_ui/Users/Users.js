import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import "./Users.css";

const Users = ({ users }) => {
  return users.length > 0 ? (
    <div>
      <ul className="user-list">
        {users.length}
        {users.map((user, index) => (
          <li key={index} className="user-box">
            <span>{user.name}</span>
            <UserAvatar user={user}></UserAvatar>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Chưa có thành viên tham gia</div>
  );
};

export default Users;
