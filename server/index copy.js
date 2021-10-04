const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const { addUser, removeUser, getUsersInRoom } = require("./users");
const { addMessage, getMessagesInRoom } = require("./messages");

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
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const JITSI_FULL_ONE = "JITSI_FULL_ONE";
const SVR_JITSI_FULL_ONE = "SVR_JITSI_FULL_ONE";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const JITSI_AUDIO_ONE = "JITSI_AUDIO_ONE";
const SVR_JITSI_AUDIO_ONE = "SVR_JITSI_AUDIO_ONE";
const JITSI_VIDEO_ALL = "JITSI_VIDEO_ALL";
const JITSI_VIDEO_ONE = "JITSI_VIDEO_ONE";
const SVR_JITSI_VIDEO_ONE = "SVR_JITSI_VIDEO_ONE";

const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  // Join a conversation
  const { roomId, name, picture } = socket.handshake.query;
  socket.join(roomId);

  const user = addUser(socket.id, roomId, name, picture);
  io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);

  // Listen for fullDesktop
  socket.on(JITSI_FULL_DESKTOP, (data) => {
    // const message = addMessage(roomId, data);
    console.log(data)
    io.in(roomId).emit(JITSI_FULL_DESKTOP, data);
  });
  // Listen for fullDesktop
  socket.on(JITSI_FULL_ONE, (data) => {
    io.in(data.id).emit(SVR_JITSI_FULL_ONE, data);
  });


  // Listen for AudioAll
  socket.on(JITSI_AUDIO_ALL, (data) => {
    // const message = addMessage(roomId, data);
    io.in(roomId).emit(JITSI_AUDIO_ALL, data);
  });
  // Listen for Audio
  socket.on(JITSI_AUDIO_ONE, (data) => {
    io.in(data.id).emit(SVR_JITSI_AUDIO_ONE, data);
  });
  // Listen for VideoAll
  socket.on(JITSI_VIDEO_ALL, (data) => {
    io.in(roomId).emit(JITSI_VIDEO_ALL, data);
  });
  // Listen for Video
  socket.on(JITSI_VIDEO_ONE, (data) => {
    io.in(data.id).emit(SVR_JITSI_VIDEO_ONE, data);
  });
  

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    const message = addMessage(roomId, data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
  });

  // Listen typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
    socket.leave(roomId);
    console.log("a user disconnect")
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

app.get("/rooms/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});
