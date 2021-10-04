// frontend/src/components/SignupReducer.js

// import needed actions
import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_REQUEST,
  GET_PROFILES_ERROR,
} from "./UserTypes";

// define the initial state of the signup store
const initialState = {
  responseting: false,
  success: false,
  messege: null,
  data: [],
  isSubimtted: false
};

// define how action will change the state of the store
export const profilesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_PROFILES_REQUEST:
      return {
        ...state,
        responseting: true,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        data: action.payload
      };
    case GET_PROFILES_ERROR:
      return {
        ...state,
        responseting: false,
        success: false,
        messege: action.payload
      };
    
     
    default:
      return state;

  }
}
