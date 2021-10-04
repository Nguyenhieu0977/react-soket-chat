import React from "react";
import "./UserAvatar.css";

const UserAvatar = ({ user }) => {
  const image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
  return (
    <>
      <img
        src={user.picture || image}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default UserAvatar;
