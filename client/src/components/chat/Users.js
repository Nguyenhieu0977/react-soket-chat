import React from "react";
import UserAvatar from "./UserAvatar";

import "./css_chat/Users.css";

const Users = ({ users }) => {
  return users.length > 0 ? (
    <div>
      <h5>Thành viên đã kết nối trong nhóm:</h5>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-box">
            <span>{user.name}</span>
            <UserAvatar user={user}></UserAvatar>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Chưa có nhóm, thành viên được chọn!</div>
  );
};

export default Users;
