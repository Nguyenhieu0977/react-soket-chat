import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
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

import ControlChat from './ControlChat'
import ControlChatMessage from './ControlChatMessage'

import ListItemText from '@material-ui/core/ListItemText';


import { getUserChat, getAllUserChat } from "./ChatActions";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  // const user_auth = useSelector((state) => state.auth);
  const user_chat = useSelector((state) => state.chats);
  // const messageEl = useRef(null);
  // useEffect(()=>{
  //   getAllUserChat()
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserChat(roomId));
  }, [1])
  // console.log(user_chat)

  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(1);
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

  // useEffect(() => {
  //   if (messageEl) {
  //     messageEl.current.addEventListener('DOMNodeInserted', event => {
  //       const { currentTarget: target } = event;
  //       target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
  //     });
  //   }
  // }, [])

  return (
    <>
      <Header />
      <div className="main-container ace-save-state " id="main-container" style={{ width: '100%', height: '100%', position: 'fixed', bottom: 0 }}>
        <Menubar />
        <div className="main-content" >
          <div className="main-content-inner" >
            <ChatBreadcrumb />
            <div className="page-content">
              <div className="row">
                <div className="col-sm-4">
                  {user && <ControlChat roomId={roomId} user={user} users={users} />}

                </div>
                <div className="col-sm-8" >
                          
                        {user && <ControlChatMessage roomId={roomId} user={user} users={users} messages={messages} typingUsers={typingUsers} />}
                        
                        <NewMessageForm
                        newMessage={newMessage}
                        handleNewMessageChange={handleNewMessageChange}
                        handleStartTyping={startTyping}
                        handleStopTyping={stopTyping}
                        handleSendMessage={handleSendMessage}
                      ></NewMessageForm>

                  {/* <div className="col">
                    
                    <div className="col-sm-8" style={{ width: '62%', position: 'fixed', bottom: "50px" }}>
                      <NewMessageForm
                        newMessage={newMessage}
                        handleNewMessageChange={handleNewMessageChange}
                        handleStartTyping={startTyping}
                        handleStopTyping={stopTyping}
                        handleSendMessage={handleSendMessage}
                      ></NewMessageForm>
                    </div>
                  </div> */}
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
