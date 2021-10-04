// frontend/src/components/SignupReducer.js

// import needed actions
import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
  } from "./SignupTypes";
  
  // define the initial state of the signup store
  const initialState = {
    usernameError: "",
    passwordError: "",
    re_passwordError: "",
    isSubimtted: false
  };
  
  // define how action will change the state of the store
  export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
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
          usernameError: "",
          passwordError: "",
          re_passwordError: "",
          isSubimtted: false
        };
      default:
        return state;
    }
  }