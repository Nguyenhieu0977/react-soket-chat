import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../chatContent/chatContent.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChatAvatarGroup from '../chatList/ChatAvatarGroup'
import Avatar from "../chatList/Avatar";
import { postMessages, getMessages } from '../ChatActions'

import { io } from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:4000";

const ChatRoom = (props) => {
  // const messagesEndRef = useRef(null);
  const scrollRef = useRef();
  const socket = useRef();
  const dispatch = useDispatch()
  const messageGroup = useSelector(state => state.chatgroups.messages);
  const chatGroupMe = useSelector(state => state.chatgroups.chatgroup);
  const userMe = useSelector(state => state.auth)
  
  // const [chatGroupMe, setChatGroupMe] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messageInput, setMessageInput] = useState();
  
  
  console.log(messages)
  // const {
  //   typingUsers,
  //   sendMessage,
  //   startTypingMessage,
  //   stopTypingMessage,
  // } = useChat(chatGroupMe.id);

  // const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  console.log(chatGroupMe.id)
  useEffect(() => {
    setMessages(messageGroup)
  },[])
  // console.log(messages)

  // useEffect(() => {
  //   setChatGroupMe(chatGroup)
  // }, [chatGroup])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    console.log(newMessage)
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    // cancelTyping();
    const msg = {
      "message": newMessage,
      "files": null,
      "chat_group": chatGroupMe.id,
      "created_by": userMe.user.id
    }
    // sendMessage(newMessage);
    try {
      setMessages([...messages, msg])
      dispatch(postMessages(msg))
      setNewMessage("");
    }catch(err){
      console.log(err)
    }
  };

  // console.log(newMessage)

  // useEffect(() => {
  //   if (isTyping) startTypingMessage();
  //   else stopTypingMessage();
  // }, [isTyping]);


  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   if (chatGroup?.id && chatGroup?.id !== "") {
  //     window.addEventListener("keydown", (e) => {
  //       if (e.keyCode == 13) {
  //       const messageForm = {
  //         "id":101,
  //         "message": newMessage,
  //         "files": null,
  //         "chat_group": chatGroup.id,
  //         "created_by": userMe.user.id
  //       }

  //       setMessageInput(messageForm)
  //     }
  //       // if (e.keyCode == 13) {
  //       //   if (msg != "") {
  //       //     chatItms.push({
  //       //       id: 100,
  //       //       type: "",
  //       //       msg: msg,
  //       //       image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //       //     });
  //       //     setChat([...chatItms]);
  //       //     scrollToBottom();
  //       //     setMsg("");
  //       //   }
  //       // }
  //     });
  //     scrollToBottom();
  //   }
  // });
  
  // useEffect(() => {
    
  // }, [chatGroupMe, messages])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // scrollToBottom();
  }, [messages]);

  return (
    <>
      {chatGroupMe?.chat_group && chatGroupMe?.chat_group !== "" && messages? (
        <div className="main__chatcontent" >
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <ChatAvatarGroup chat_group={chatGroupMe.chat_group} user_group={chatGroupMe.user_group} id={chatGroupMe.id} />
                {/* <Avatar
                  isOnline="active"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                />
                <p>Tim Hover</p> */}
                {/* <Users users={users}></Users> */}
              </div>
            </div>

            <div className="blocks">
              <div className="settings">
                <button className="btn-nobg">
                  <i className="fa fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="content__body">

            <div className="messages-container" >
              <ol className="messages-list">
                {messages.map((message, i) => (
                  <li key={i} ref={scrollRef}>
                    <ChatMessage message={message} userMe={userMe}></ChatMessage>
                  </li>
                ))}
                {/* {typingUsers.map((user, i) => (
                  // <li key={messages.length + i}>
                  <li>
                    <TypingMessage user={user}></TypingMessage>
                  </li>
                ))} */}
              </ol>
            </div>
            {/* <div ref={messagesEndRef} /> */}

          </div>
          <div className="content__footer" style={{ width: '50%', position: 'fixed', bottom: "80px", marginLeft: "0px" }}>
            <NewMessageForm
              newMessage={newMessage}
              handleNewMessageChange={handleNewMessageChange}
              // handleStartTyping={startTyping}
              // handleStopTyping={stopTyping}
              handleSendMessage={handleSendMessage}
            ></NewMessageForm>
          </div>
        </div>
      ) : (
        <div className="main__chatcontent">
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <h4>Chào mừng bạn đến với phần mềm trao đổi trực tuyến ngành CNTT Quân khu 7 </h4>
              </div>
            </div>
            <div className="blocks">
              <div className="settings">
                <button className="btn-nobg">
                  <i className="fa fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="content__body">

          </div>
        </div>
      )
      }
    </>
  );
};

export default ChatRoom;
