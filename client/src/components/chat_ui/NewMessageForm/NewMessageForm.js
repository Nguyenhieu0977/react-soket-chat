import React from "react";
import "./NewMessageForm.css";

const NewMessageForm = ({
  newMessage,
  handleNewMessageChange,
  handleStartTyping,
  handleStopTyping,
  handleSendMessage,
}) => {
  return (
    <form className="new-message-form" >
      <input
        type="text"
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Nhập nội dung trao đổi..."
        className="new-message-input-field"
        onKeyPress={handleStartTyping}
        onKeyUp={handleStopTyping}
      />
      <button
        type="submit"
        onClick={handleSendMessage}
        className="send-message-button"
      >
        <i className="fa fa-paper-plane">&nbsp; Gửi đi</i>
      </button>
    </form>
  );
};

export default NewMessageForm;
