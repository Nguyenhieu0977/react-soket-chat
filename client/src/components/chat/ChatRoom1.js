import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import "./css_chat/ChatRoom.css";
import useChat from "../../useChat";

import ChatMessage from "./ChatMessage";
import useTyping from "../../useTyping";
import NewMessageForm from "./NewMessageForm";
import TypingMessage from "./TypingMessage";
import Users from "./Users";
import UserAvatar from "./UserAvatar";
import { Container } from "react-bootstrap";

import ChatBreadcrumb from "./ChatBreadcrumb";
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"


import { getUserChat, getAllUserChat } from "./ChatActions";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;

  // const user_auth = useSelector((state) => state.auth);
  const user_chat = useSelector((state) => state.chats);
  // useEffect(()=>{
  //   getAllUserChat()
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserChat(roomId));
  }, [roomId])
  // console.log(user_chat)


  // console.log(roomId)
  const {
    messages,
    user,
    users,
    typingUsers,
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
    <>
      <Header />
      <div className="main-container ace-save-state" id="main-container">
        <Menubar />
        <div className="main-content">
          <div className="main-content-inner" >
            <ChatBreadcrumb />
            <div className="page-content">
              <div className="row">
                <div className="col-sm-6">
                  <div className="chat-room-top-bar">
                    <h1 className="room-name">Room: {roomId}</h1>
                    {user && <UserAvatar user={user}></UserAvatar>}
                  </div>
                  <Users users={users}></Users>
                  <div className="messages-container">
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
                  <NewMessageForm
                    newMessage={newMessage}
                    handleNewMessageChange={handleNewMessageChange}
                    handleStartTyping={startTyping}
                    handleStopTyping={stopTyping}
                    handleSendMessage={handleSendMessage}
                  ></NewMessageForm>
                </div>
                
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default withRouter(ChatRoom);
