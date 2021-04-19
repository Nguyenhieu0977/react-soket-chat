// frontend/src/Reducer.js
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// import new reducer
import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer, // <--- add it here
    auth: loginReducer // <--- add reducer
  });

export default createRootReducer;