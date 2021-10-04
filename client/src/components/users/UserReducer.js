// frontend/src/components/SignupReducer.js

// import needed actions
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  RESETPASSWORD_SUCCESS,
} from "./UserTypes";

// define the initial state of the signup store
const initialState = {
  responseting: false,
  success: false,
  messege: null,
  data: [],
  usernameError: "",
  passwordError: "",
  re_passwordError: "",
  isSubimtted: false
};

// define how action will change the state of the store
export const userReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        responseting: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        data: action.payload
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        responseting: false,
        success: false,
        messege: action.payload
      };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          responseting: false,
          success: true,
          data: action.payload
        };
      case DELETE_USER_ERROR:
        return {
          ...state,
          responseting: false,
          success: false,
          messege: action.payload
        };
    case CREATE_USER_SUBMITTED:
      return {
        usernameError: "",
        passwordError: "",
        re_passwordError: "",
        isSubimtted: true
      };
    case CREATE_USER_ERROR:
      const errorState = {
        usernameError: "",
        passwordError: "",
        re_passwordError: "",
        isSubimtted: false
      };
      if (action.errorData.hasOwnProperty("username")) {
        errorState.usernameError = action.errorData["username"];
      }
      if (action.errorData.hasOwnProperty("password")) {
        errorState.passwordError = action.errorData["password"];
      }
      if (action.errorData.hasOwnProperty("re_password")) {
        errorState.re_passwordError = action.errorData["re_password"];
      }
      return errorState;
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        usernameError: "",
        passwordError: "",
        re_passwordError: "",
        isSubimtted: false
      };
      case RESETPASSWORD_SUCCESS:
        return {
          ...state,
          responseting: true,
        };
    default:
      return state;

  }
}