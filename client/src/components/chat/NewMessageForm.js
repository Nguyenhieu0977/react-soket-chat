import React from "react";
import "./css_chat/NewMessageForm.css";

const NewMessageForm = ({
  newMessage,
  handleNewMessageChange,
  handleStartTyping,
  handleStopTyping,
  handleSendMessage,
}) => {
  return (
    <form >
      <div className="form-actions" style={{ width: '61%', position: 'fixed', bottom: "23px" }}>
        <div className="input-group">
          <input type="text" className="form-control"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Nhập nội dung gửi đi..."
            onKeyPress={handleStartTyping}
            onKeyUp={handleStopTyping} />
          <span className="input-group-btn">
            <button className="btn btn-sm btn-info no-radius"
              type="submit"
              onClick={handleSendMessage}
            >
              <i className="ace-icon fa fa-share" />
              Gửi đi
            </button>
          </span>
        </div>
      </div>
    </form>

  );
};

export default NewMessageForm;
