import { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFullScreen } from "react-browser-hooks";

import socketIOClient from "socket.io-client";
import axios from "axios";
import { toastOnError } from "../../utils/Utils";

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";

const JITSI_MUTE_ALL = "JITSI_MUTE_ALL";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useJitsi_socket = (roomId) => {
  const user_auth = useSelector((state) => state.auth);
  const [fullDesktop, setFullDesktop] = useState(false);
  const [audioAllJitsi, setMuteAllJitsi] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const socketRef = useRef();
  // console.log(user_auth.user.username)
  const { toggle, fullScreen } = useFullScreen();


  // console.log(fullDesktop)
  // console.log(audioAllJitsi)
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
      setFullDesktop(data.fullScreen)
    });

    socketRef.current.on(JITSI_AUDIO_ALL, (audioAllJitsi) => {
      setMuteAllJitsi(audioAllJitsi)
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user]);

  const sendFullDesktop = (fullScreen) => {
    if (!socketRef.current) return;
    socketRef.current.emit(JITSI_FULL_DESKTOP, {
      senderId: socketRef.current.id,
      // user,
      fullScreen,
    });
  };

  const sendAudioAllJitsi = (audioAllJitsi) => {
    if (!socketRef.current) return;
    socketRef.current.emit(JITSI_AUDIO_ALL, {
      senderId: socketRef.current.id,
      // user,
      audioAllJitsi,
    });
  };

  return {
    user,
    users,
    fullDesktop,
    audioAllJitsi,
    sendFullDesktop,
    sendAudioAllJitsi,
  };
};

export default useJitsi_socket;
