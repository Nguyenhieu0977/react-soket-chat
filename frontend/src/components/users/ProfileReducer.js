// frontend/src/components/SignupReducer.js

// import needed actions
import {
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_SUBMITTED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUBMITTED,
  UPDATE_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_ERROR,
} from "./UserTypes";

// define the initial state of the signup store
const initialState = {
  responseting: false,
  success: false,
  messege: null,
  data: [],
  first_nameError: "",
  last_nameError: "",
  imageError: "",
  isSubimtted: false
};

// define how action will change the state of the store
export const profileReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        responseting: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        data: action.payload
      };
    case UPDATE_PROFILE_SUBMITTED:
      return {
        first_nameError: "",
        last_nameError: "",
        imageError: "",
        isSubimtted: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        responseting: false,
        success: false,
        messege: action.payload
      };

    case UPDATE_PROFILE_ERROR:
      const errorState = {
        first_nameError: "",
        last_nameError: "",
        imageError: "",
        isSubimtted: false
      };
      if (action.errorData.hasOwnProperty("first_name")) {
        errorState.first_nameError = action.errorData["first_name"];
      }
      if (action.errorData.hasOwnProperty("last_name")) {
        errorState.last_nameError = action.errorData["last_name"];
      }
      if (action.errorData.hasOwnProperty("iamge")) {
        errorState.imageError = action.errorData["image"];
      }
      return errorState;
    default:
      return state;

  }
}