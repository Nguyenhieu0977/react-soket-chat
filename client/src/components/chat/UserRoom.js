import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useFullScreen } from "react-browser-hooks";


import socketIOClient from "socket.io-client";
import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import "./css_chat/ChatRoom.css";

// import { getUserChat, getAllUserChat } from "./ChatActions";
import UserList from "./UserList";
import { setAudioAll, setVideoAll, setFullAll  } from "../jitsi/JitsiActions"

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";

const JITSI_MUTE_ALL = "JITSI_MUTE_ALL";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const JITSI_VIDEO_ALL = "JITSI_VIDEO_ALL";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const SOCKET_SERVER_URL = "http://localhost:4000";


const UserRoom = (props) => {
  const { roomId } = props.match.params;
  const user_auth = useSelector((state) => state.auth);
  const jitsiStore = useSelector((state) => state.jitsi );
  // console.log(jitsiStore)
  const [fullDesktop, setFullDesktop] = useState(false);
  const [audioAllJitsi, setAudioAllJitsi] = useState(false);
  const [videoAllJitsi, setVideoAllJitsi] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const socketRef = useRef();
  const { toggle, fullScreen } = useFullScreen();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      setUser({
        name: user_auth.user.username,
        picture: "assets/images/avatars/user.jpg",
      });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/rooms/${roomId}/users`
      );
      const result = response.data.users;
      setUsers(result);
    };

    fetchUsers();
  }, [roomId]);


  useEffect(() => {
    if (!user) {
      return;
    }
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, name: user.name, picture: user.picture },
    });

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
      if (user.id === socketRef.current.id) return;
      setUsers((users) => [...users, user]);
    });

    socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
      setUsers((users) => users.filter((u) => u.id !== user.id));
    });

    socketRef.current.on(JITSI_FULL_DESKTOP, (data) => {
      dispatch(setFullAll(data.fullScreen));
      // toggle()
      // setFullDesktop(data.fullScreen)
    });

    socketRef.current.on(JITSI_AUDIO_ALL, (data) => {
      console.log(data)
      // dispatch(setAudioAll(data.audioAllJitsi));
      // jitsiStore.jitsiStrore.executeCommand('toggleAudio');

    });

    socketRef.current.on(JITSI_VIDEO_ALL, (data) => {
      // console.log(data)
      // dispatch(setVideoAll(data.videoAllJitsi));
        // jitsiStore.jitsiStrore.executeCommand('toggleVideo')
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user]);

  const handleFullDesktop = (fullScreen) => {
    if (!socketRef.current) return;
    socketRef.current.emit(JITSI_FULL_DESKTOP, {
      senderId: socketRef.current.id,
      // user,
      fullScreen,
    });
  };

  const handleAudioJitsi = (event) => {
    event.preventDefault();
    setAudioAllJitsi(!audioAllJitsi)
    if (!socketRef.current) return;
    socketRef.current.emit(JITSI_AUDIO_ALL, {
      senderId: socketRef.current.id,
      // user,
      audioAllJitsi,
    });
  }

  const handleVideoJitsi = (event) => {
    event.preventDefault();
    setVideoAllJitsi(!videoAllJitsi)
    if (!socketRef.current) return;
    socketRef.current.emit(JITSI_VIDEO_ALL, {
      senderId: socketRef.current.id,
      // user,
      videoAllJitsi,
    });
  }

  return (
    <>
    
    < ul className="nav nav-list" >
      <li>
        <a href="/">
          <i className="menu-icon fa fa-tachometer" />
          <span className="menu-text"> Room: {roomId} </span>
        </a>
        {/* {user && <UserAvatar user={user}></UserAvatar>} */}
        <b className="arrow" />
      </li>
      <UserList users={users} ></UserList>

      {/* {audioAllJitsi ? "Co":""} */}
      {/* Dieu khien */}
      <li className="active open">
        <a href="#" className="dropdown-toggle">
          <i className="menu-icon fa fa-cogs" />
          <span className="menu-text"> Điều khiển chung </span>
          <b className="arrow fa fa-angle-down" />
        </a>
        <b className="arrow" />
        <ul className="submenu center">
          <p></p>
          <p>
            <button type="button" className="btn btn-white btn-blue btn-sm" title="Tắt/mở tất cả Camera"
            onClick={handleVideoJitsi}
            >
              <i className="ace-icon fa fa-video-camera bigger-120 orange"></i>
            </button> &nbsp;
                  <button className="btn btn-white btn-blue btn-sm" title="Tắt/mở tất cả Miccro"
              onClick={handleAudioJitsi}
            >
              <i className="ace-icon fa fa-headphones bigger-120 orange"></i>
            </button> &nbsp;

                  <button className="btn btn-white btn-blue btn-sm" title="Chia sẽ màn hình">
              <i className="ace-icon fa fa-laptop  bigger-120 orange"></i>
            </button>
          </p>
          <p>
            <button type="button" className="btn btn-white btn-blue btn-sm" title="Chọn tính năng hàn hình đầy đủ"
              onClick={handleFullDesktop}
            >
              {fullScreen ? (
                <i className="ace-icon fa fa-desktop  bigger-120 green" ></i>
              ) : (
                <i className="ace-icon fa fa-external-link bigger-120 red" ></i>
              )}


            </button> &nbsp;
              <button type="button" className="btn btn-white btn-blue btn-sm" title="Lựa chọn kiểu bố trí khung hình">
              <i className="ace-icon fa fa-credit-card bigger-120 green" ></i>
            </button> &nbsp;
                    <button type="button" className="btn btn-white btn-blue btn-sm" title="Kết thúc cuộc họp tất cả">
              <i className="ace-icon fa fa-power-off  bigger-120 info"></i>
            </button>
          </p>
        </ul>

      </li>
    </ul >
    </>
  );
};

export default withRouter(UserRoom);
