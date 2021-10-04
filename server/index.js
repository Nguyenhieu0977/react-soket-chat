const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
// const { addUser, removeUser, getUsersInRoom } = require("./users");
// const { addMessage, getMessagesInRoom } = require("./messages");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = 4000;
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const JITSI_FULL_ONE = "JITSI_FULL_ONE";
const SVR_JITSI_FULL_ONE = "SVR_JITSI_FULL_ONE";
const JITSI_AUDIO_ONE = "JITSI_AUDIO_ONE";
const SVR_JITSI_AUDIO_ONE = "SVR_JITSI_AUDIO_ONE";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const SVR_JITSI_AUDIO_ALL = "SVR_JITSI_AUDIO_ALL";
const JITSI_VIDEO_ALL = "JITSI_VIDEO_ALL";
const SVR_JITSI_VIDEO_ALL = "SVR_JITSI_VIDEO_ALL";
const JITSI_VIDEO_ONE = "JITSI_VIDEO_ONE";
const SVR_JITSI_VIDEO_ONE = "SVR_JITSI_VIDEO_ONE";
const JITSI_FILMSTRIP = "JITSI_FILMSTRIP";
const SVR_JITSI_FILMSTRIP = "SVR_JITSI_FILMSTRIP";
const JITSI_TOGGLE_VIEW = "JITSI_TOGGLE_VIEW";
const SVR_JITSI_TOGGLE_VIEW = "SVR_JITSI_TOGGLE_VIEW";
const JITSI_TOGGLE_DESKTOP = "JITSI_TOGGLE_DESKTOP";
const SVR_JITSI_TOGGLE_DESKTOP = "SVR_JITSI_TOGGLE_DESKTOP";
const SVR_JITSI_HANGUP_ALL = "SVR_JITSI_HANGUP_ALL";
const JITSI_HANGUP_ALL = "JITSI_HANGUP_ALL";
const SVR_JITSI_HANGUP = "SVR_JITSI_HANGUP";
const JITSI_HANGUP = "JITSI_HANGUP";
const JITSI_STOP_SHARE = "JITSI_STOP_SHARE";
const SVR_JITSI_STOP_SHARE = "SVR_JITSI_STOP_SHARE";
const JITSI_TILE_VIEW = "JITSI_TILE_VIEW";
const SVR_JITSI_TILE_VIEW = "SVR_JITSI_TILE_VIEW";

const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

const users = [];

const addUser = (roomId, userId, fullname, socketId, jitsiUserId, isAudioMuted, isVideoMuted, isTileView ) => {
  const existingUser = users.find(
    (user) => user.roomId === roomId && user.userId === userId
  );

  if (!userId || !roomId) return { error: "Username and room are required." };
  // if (existingUser) return { error: "Username is taken." };

  const user = { roomId, userId, fullname, socketId, jitsiUserId, isAudioMuted, isVideoMuted, isTileView };
  users.push(user);
  return user;
  // return {roomId: user.roomId, userId: user.userId, userId: user.userId, fullname: user.fullname, jitsiUserId: user.jitsiUserId };
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) return users.splice(index, 1)[0];
};
const getUser = (userId) => users.find((user) => user.userId === userId);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  // Join a conversation
  const { roomId, userId, fullname, jitsiUserId, isAudioMuted, isVideoMuted, isTileView } = socket.handshake.query;
  socket.join(roomId);

    console.log(isVideoMuted)
  const user = addUser(roomId, userId, fullname, socket.id, jitsiUserId, isAudioMuted, isVideoMuted, isTileView);
  io.in(roomId).emit(USER_JOIN_CHAT_EVENT, users);
  console.log(user)
  // Listen for Audio
  socket.on(JITSI_AUDIO_ONE, (id) => {
    console.log(id)
    const sId = users.find(u=>u.jitsiUserId===id)
    console.log(sId)
    io.in(sId?.socketId).emit(SVR_JITSI_AUDIO_ONE, id);

  });
  socket.on(JITSI_VIDEO_ONE, (id) => {
    const sId = users.find(u=>u.jitsiUserId===id)
    io.in(sId?.socketId).emit(SVR_JITSI_VIDEO_ONE, id);
  });
  socket.on(JITSI_STOP_SHARE, (id) => {
    const sId = users.find(u=>u.jitsiUserId===id)
    io.in(sId?.socketId).emit(SVR_JITSI_STOP_SHARE, id);
  });
  socket.on(JITSI_TILE_VIEW, (id) => {
    const sId = users.find(u=>u.jitsiUserId===id)
    io.in(sId?.socketId).emit(SVR_JITSI_TILE_VIEW, id);
  });
  socket.on(JITSI_AUDIO_ALL, (roomId) => {
    io.in(roomId).emit(SVR_JITSI_AUDIO_ALL, roomId);
  });
  socket.on(JITSI_VIDEO_ALL, (roomId) => {
    io.in(roomId).emit(SVR_JITSI_VIDEO_ALL, roomId);
  });
  socket.on(JITSI_FILMSTRIP, (roomId) => {
    io.in(roomId).emit(SVR_JITSI_FILMSTRIP, roomId);
  });
  socket.on(JITSI_TOGGLE_VIEW, (roomId) => {
    io.in(roomId).emit(SVR_JITSI_TOGGLE_VIEW, roomId);
  });
  socket.on(JITSI_TOGGLE_DESKTOP, (data) => {
    // const sId = users.find(u=>u.jitsiUserId===id)
    io.in(data.roomId).emit(SVR_JITSI_TOGGLE_DESKTOP, {id: data.id, isFullDestop: data.isFullDestop});
    console.log(data.id)
  });
  socket.on(JITSI_HANGUP_ALL, (roomId) => {
    io.in(roomId).emit(SVR_JITSI_HANGUP_ALL, roomId);
  });
  socket.on(JITSI_HANGUP, (id) => {
    const sId = users.find(u=>u.jitsiUserId===id)
    io.in(sId?.socketId).emit(SVR_JITSI_HANGUP, id);
  });

  
  
  // Listen for Video
  // socket.on(JITSI_VIDEO_ONE, (id) => {
  //   io.in(id).emit(SVR_JITSI_VIDEO_ONE, id);
  // });

  console.log(users)
  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
    socket.leave(roomId);
    console.log("a user disconnect")
    // console.log(user)
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});