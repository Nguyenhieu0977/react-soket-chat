import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import "./ChatMessage.css";

const ChatMessage = ({ message, userMe }) => {
  // console.log(message)
  return (
    <div
      className={`message-item ${
        // message.ownedByCurrentUser || userMe.user.id===message.created_by ? "my-message" : "received-message"
        userMe.user.id===message?.created_by ? "my-message" : "received-message"
      }`}
    >
      {!userMe.user.id===message?.created_by && (
        <div className="message-avatar-container">
          {/* <UserAvatar user={message?.user}></UserAvatar> */}
        </div>
      )}

      <div className="message-body-container">
        {!userMe.user.id===message?.created_by && (
          // <div className="message-user-name">{message.created_by}</div>
          <div className="message-user-name">{message?.created_by}</div>
        )}
        <div className="message-body">{message?.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
