// frontend/Reducer.js

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
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
    jitsi: jitsiReducer,
    calendars: CalendarReducer,
    users: userReducer,
    profiles: profilesReducer,
    profile: profileReducer,
    units: unitsReducer,
  });

export default createRootReducer;