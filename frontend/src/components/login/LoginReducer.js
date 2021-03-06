// frontend/src/components/login/LoginReducer.js file

import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER, GET_PROFILEUSER_SUCCESS } from "./LoginTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {},
  token: ""
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_PROFILEUSER_SUCCESS:
      return {
        ...state,
        profile: action.payload
      };
    case UNSET_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};