import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Avatar from "./Avatar";
import { getChatGroup, getMessages } from "../ChatActions";

function ChatListGroups(props) {

  const dispatch = useDispatch();

  const {isOnline, active, chat_group, image, animationDelay, id } = props;

  const selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) { e.currentTarget.parentNode.children[index].classList.remove("active"); }
    e.currentTarget.classList.add("active");
    if(id){
      dispatch(getMessages(id));
      dispatch(getChatGroup(id));
    }
    
  };
  
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={selectChat}
      className={`chatlist__item ${active ? active : "" } `}
      key={id}
    >
      <Avatar
        image={ image ? image : "http://placehold.it/80x80" }
        isOnline={isOnline}
        key={id}
      />
      <div className="userMeta">
        <p>{chat_group}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}

export default ChatListGroups;