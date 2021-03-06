import { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFullScreen } from "react-browser-hooks";



import socketIOClient from "socket.io-client";
import axios from "axios";
import { toastOnError } from "./utils/Utils";

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
const JITSI_MUTE_ALL = "JITSI_MUTE_ALL";
const JITSI_MUTE_ONE = "JITSI_MUTE_ONE";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {
  const user_auth = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [fullDesktop, setFullDesktop] = useState(false);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState();
  const socketRef = useRef();
  // console.log(user_auth.user.username)
  const { toggle, fullScreen } = useFullScreen();
  // console.log(fullDesktop)
  useEffect(() => {
    const fetchUser = async () => {
      setUser({
            name: user_auth.user.username,
            picture: "assets/images/avatars/user.jpg",
          });
    // axios
    // .get("/api/v1/users/me/")
    // .then(response => {
    //   setUser({
    //     name: response.data.username,
    //     picture: "assets/images/avatars/user.jpg",
    //   });
    // })
    // .catch(error => {
    //   toastOnError(error);
    // });
    
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
    const fetchMessages = async () => {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/rooms/${roomId}/messages`
      );
      const result = response.data.messages;
      setMessages(result);
    };

    fetchMessages();
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
    
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => [...users, user]);
      }
    });

    socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => users.filter((u) => u.name !== user.name));
      }
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


  const sendMessage = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      user: user,
    });
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  return {
    messages,
    user,
    users,
    typingUsers,
    fullDesktop,
    sendFullDesktop,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  };
};

export default useChat;
