import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "../chatList/Avatar";

function ChatItem (props) {
    const {msg, image, user, id} = props;
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user ? user : ""}`}
        key={id}
      >
        <div className="chat__item__content" key={id}>
          <div className="chat__msg">{msg}</div>
          <div className="chat__meta">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={image} id={id} key={id}/>
      </div>
    );
  }

export default withRouter(ChatItem)
