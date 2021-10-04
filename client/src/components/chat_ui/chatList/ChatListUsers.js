import React, { useEffect, useState, useRef } from "react";
import "./chatList.css";
import ChatListUsersGroup from './ChatListUsersGroup';
import useChat from "../useChat"

function ChatListUsers(props) {

  const { groupUsers, dataUser } = props;
  console.log(groupUsers)
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat();

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"

  const ChatListItem = dataUser.filter(items => items.id in groupUsers.user_group).map((item, index) => {
    return (
      <ChatListUsersGroup
        id={item.id}
        fullname={item.last_name + " " + item.first_name}
        key={item.id}
        animationDelay={index + 1}
        active={item.active ? "active" : ""}
        isOnline={item.isOnline ? "active" : ""}
        image={image}
      />
    )
  })
  
  return (
    <div className="main__chatlist" style={{ maxHeight: "90vh" }}>
      <div className="chatlist__heading">
        {groupUsers.user_group !==null&& <h4> &nbsp;&nbsp; <i className="fa fa-users" style={{ color: "green" }}>&nbsp;Thành viên {groupUsers.chat_group}: ({groupUsers.user_group.length})</i> </h4>}
        
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatlist__items2">
        {ChatListItem}
      </div>
    </div>
  );
}

export default ChatListUsers