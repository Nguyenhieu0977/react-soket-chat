import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatRoom from "../ChatRoom/ChatRoom";
import UserProfile from "../userProfile/UserProfile";
import { withRouter } from "react-router-dom";

import { getChatGroups, getMessages } from "../ChatActions";
import { getUsers } from '../../users/UserActions';
import ChatListUsers from "../chatList/ChatListUsers";

function ChatBody() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.user)

  const [idGroup, setIdGroup] = useState()
  const [isStatus, setIsStatus] = useState(false)
  const [chats, setChats] = useState([])
  const [chatGroups, setChatGroups] = useState([])

  const chat_Groups = useSelector(state => state.chatgroups.chatgroups);
  const success = useSelector(state => state.chatgroups.success);
  const dataUser = useSelector(state => state.users.data);
  // const groupUsers = useSelector(state => state.chatgroups.chatgroup)

  useEffect(() => {
    dispatch(getChatGroups())
    dispatch(getUsers())
  }, [])

  return (
    <div className="main__chatbody">
      <ChatList chatGroups={chat_Groups} dataUser={dataUser} success={success} />
      <ChatRoom chatGroups={chat_Groups}/>
      <UserProfile />
    </div>
  );
}

export default withRouter(ChatBody)
