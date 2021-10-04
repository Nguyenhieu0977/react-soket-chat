import React, { useState, createRef, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import ChatAvatarGroup from '../chatList/ChatAvatarGroup'
import { withRouter } from "react-router-dom";

import ChatRoom from "../ChatRoom/ChatRoom"

function ChatContent(props) {
  const messagesEndRef = useRef(null);
  const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    }
  ];

  const image = "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg"

  const chatGroup = useSelector(state => state.chatgroups.chatgroup);
  const chatContent = useSelector(state => state.chatgroups.messages);
  const msgIn = useState(chatContent)
  const [chat, setChat] = useState(chatItms)
  const [msg, setMsg] = useState()
 
  // console.log(msgIn)


  // const { chat_group, user_group } = chatGroup;

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   if (chatGroup.chat_group && chatGroup.chat_group !== "") {
  //     window.addEventListener("keydown", (e) => {
  //       if (e.keyCode == 13) {
  //         if (msg != "") {
  //           chatItms.push({
  //             id: 100,
  //             type: "",
  //             msg: msg,
  //             image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //           });
  //           setChat([...chatItms]);
  //           scrollToBottom();
  //           setMsg("");
  //         }
  //       }
  //     });
  //     scrollToBottom();
  //   }
  // });


  return (
    <>
      {chatGroup.chat_group && chatGroup.chat_group !== "" ? (
        <div className="main__chatcontent">
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <ChatAvatarGroup chat_group={chatGroup.chat_group} user_group={chatGroup.user_group} />
                <Avatar
                  isOnline="active"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                />
                <p>Tim Hover</p>
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
          <ChatRoom />
            <div className="chat__items">
              {/* {chat.map((itm, index) => {
                return (
                  <ChatItem
                    animationDelay={index + 2}
                    key={itm.index}
                    id={itm.index}
                    user={itm.type ? itm.creat_by : "me"}
                    msg={itm.msg}
                    image={itm.image}
                  />
                );
              })}
              <div ref={messagesEndRef} /> */}

            </div>
          </div>
          {/* <div className="content__footer">
            <div className="sendNewMessage">
              <button className="addFiles">
                <i className="fa fa-plus"></i>
              </button>
              <input
                type="text"
                placeholder="Type a message here"
                onChange={e => setMsg(e.target.value)}
                name="msg"
                value={msg}
              />
              <button className="btnSendMsg" id="sendMsgBtn">
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div> */}
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
      )}
    </>
  );
}

export default withRouter(ChatContent)
