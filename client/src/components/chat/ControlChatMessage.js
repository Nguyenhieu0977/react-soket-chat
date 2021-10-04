import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import "./css_chat/ChatRoom.css";
import useChat from "../../useChat";

import ChatMessage from "./ChatMessage";
import useTyping from "../../useTyping";
import NewMessageForm from "./NewMessageForm";
import TypingMessage from "./TypingMessage";
import Users from "./Users";
import UserAvatar from "./UserAvatar";
import { getUserChat, getAllUserChat } from "./ChatActions";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '61%',
    // maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    overflow: 'auto',
    flex: 1,
    // outline: 'none',
    // overflow:"auto",
    // overscrollBehaviorY:"contain",
    // overflowAnchor:"auto",
    // overscrollBehaviorY:"auto",
    // behavior: 'smooth',
    // overscrollBehaviorY:"auto",
    // maxHeight: "70%",
    fontSize: 14,
    border: "solid 1px",
    borderColor: "#DBDBDB",
    // margin: "-2px",
    bottom: "110px",
    top: "120px",
    // display: "block"
    // msOverflowY:"scoll",
    
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

function ControlChatMessage(props) {
  const classes = useStyles();
  const { roomId, user, users, typingUsers, messages  } = props

  // useEffect(()=>{
  //   getAllUserChat()
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserChat(roomId));
  }, [roomId])
  // console.log(user_chat)

  const {
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);


  return (
    <List className={classes.root} subheader={<li />}>
      {/* <div className="chat-room-top-bar">
        {user && <UserAvatar user={user}></UserAvatar>}
      </div> */}
      <Users users={users}></Users>

      <div className="messages-container" >
        <ol className="messages-list">
          {messages.map((message, i) => (
            
              <li key={i}>
                <ChatMessage message={message}></ChatMessage>
              </li>

          ))}
          {typingUsers.map((user, i) => (
            <li key={messages.length + i}>
              <TypingMessage user={user}></TypingMessage>
            </li>
          ))}
        </ol>
      </div>
    </List >
  );
}

export default withRouter(ControlChatMessage);