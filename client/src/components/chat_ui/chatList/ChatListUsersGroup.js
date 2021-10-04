import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "./Avatar";
import "./chatList.css";

function ChatListUsersGroup(props) {
  const { isOnline, active, fullname, image, animationDelay, id } = props;
  const selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={selectChat}
      className={`chatlist__item ${active ? active : ""
        } `}
      key={id}
    >
      <Avatar
        image={
          image ? image : "http://placehold.it/80x80"
        }
        isOnline={isOnline}
      />

      <div className="userMeta">
        <p>{fullname}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}

export default ChatListUsersGroup;