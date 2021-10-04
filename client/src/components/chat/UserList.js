import React, { useState } from "react";
import UserAvatar from "./UserAvatar";

import "./css_chat/Users.css";
import { useSelector } from "react-redux";

const UserList = ({ users, audioClick, cameraClick, fullClick, stateAudio }) => {
  // const [stateAudio, setStateAudio] = useState(true)
  const [stateCamera, setStateCamera] = useState(true)
  const [stateRaiseHand, setStateRaiseHand] = useState(true)
  const [stateFull, setStateFull] = useState(true)
  const {jitsiState} = useSelector((state) => state.jitsi);

  return (
    <li className="active open">
      <a href="#" className="dropdown-toggle">
        <i className="menu-icon fa fa-users" />
        <span className="menu-text"> Thành viên <span className="badge badge-primary">{users.length}</span></span>

        <b className="arrow fa fa-angle-down" />
      </a>
      <b className="arrow" />

      { users.length > 0 ? (
        <ul className="submenu">
          <li >
            <ul id="tasks" className="item-list ui-sortable" style={{ marginRight: '2px' }} >
              <div className="widget-body">
                <div className="widget-main padding-4 scrollable" data-size={250}>
                  <div className="content">
                    {users.map((user, index) => (

                      <li className="item-green  ui-sortable-handle" key={index} style={{marginRight:"7px"}}>
                        {/* <UserAvatar user={user}></UserAvatar> fa-microphone-slash */}
                        <label className="inline">
                          <span className="lbl"> {user.name} </span>
                        </label>
                        <div className="pull-right action-buttons">
                        {stateRaiseHand ? (
                          <button className="blue" title="Đăng ký phát biểu">
                            <i className="ace-icon fa fa-hand-paper-o  green" />
                          </button>
                        ):("")}
                          <span className="vbar" />
                          <button className="blue" onClick={() => { audioClick(user.id) }}>
                            {stateAudio ? (<i className="ace-icon fa fa-microphone green" />) : (<i className="ace-icon fa fa-microphone-slash red" />)}

                          </button>
                          <span className="vbar" />
                          <button className="blue" onClick={() => { cameraClick(user.id, setStateCamera(!stateCamera)) }}>
                            {stateCamera ? (<i className="ace-icon fa fa-video-camera green" />) : (<i className="ace-icon fa fa-video-camera red" />)}
                          </button>
                          <button className="blue" onClick={() => { fullClick(user.id, setStateFull(!stateFull)) }}>
                            {stateFull ? (<i className="ace-icon fa fa-video-camera green" />) : (<i className="ace-icon fa fa-video-camera red" />)}
                          </button>
                          <span className="vbar" />
                        </div>
                      </li>
                    ))}

                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      ) : (
        <ul className="submenu">
          <li >
            <ul id="tasks" className="item-list ui-sortable" style={{ marginRight: '2px' }} >
              <div className="widget-body">
                <div className="widget-main padding-4 scrollable" data-size={250}>
                  <div className="content">
                    <li className="item-green  ui-sortable-handle" >
                      <label className="inline">
                        <span className="lbl" style={{ color: "while" }}> Chưa có thành viên! </span>
                      </label>
                    </li>
                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      )};

    </li>
  )
};

export default UserList;
