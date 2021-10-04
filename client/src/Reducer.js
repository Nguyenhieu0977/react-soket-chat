// frontend/Reducer.js

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { chatReducer } from "./components/chat/ChatReducer";
import { chatUiReducer, chatGroupReducer } from "./components/chat_ui/ChatUiReducer";
import { jitsiReducer } from "./components/jitsi/JisiReducer"
import { CalendarReducer } from "./components/calendar/CalendarReducer";
import { userReducer } from "./components/users/UserReducer"
import { profileReducer } from "./components/users/ProfileReducer"
import { profilesReducer } from "./components/users/ProfilesReducer"
import { unitsReducer } from "./components/users/UnitsReducer"

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    chats: chatReducer,
    chatUi: chatUiReducer,
    chatgroups: chatGroupReducer,
    jitsi: jitsiReducer,
    calendars: CalendarReducer,
    users: userReducer,
    profiles: profilesReducer,
    profile: profileReducer,
    units: unitsReducer,
  });

export default createRootReducer;