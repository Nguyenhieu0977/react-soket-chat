import React, { useEffect, useState, useRef } from "react";
import {useSelector} from "react-redux";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import ChatListGroups from './ChatListGroups';
import useChat from "../useChat"

function ChatList(props) {

  const auth = useSelector(state => state.auth);
  const {chatGroups, dataUser, success } = props;

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
// console.log(auth.user.id)
// console.log(chatGroups)
  const ChatListGroup = chatGroups?.filter(cg => cg.user_group.includes(auth.user.id)).map((item, index) => {
  // const ChatListGroup = chatGroups?.map((item, index) => {
    return (
      <ChatListGroups
        // handleChatGroups = {handleChatGroup} 
        // user={user}
        id={item.id}
        chat_group={item.chat_group}
        key={index}
        animationDelay={index + 1}
        active={item.active ? "active" : ""}
        isOnline={item.isOnline ? "active" : ""}
        image={image}
      />
    );
  });

  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span>Tạo nhóm mới</span>
      </button>
      <div className="chatlist__heading">
        <h5>Chọn nhóm liên hệ</h5>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {ChatListGroup}
        
      </div>
    </div>
  );
}

export default ChatList