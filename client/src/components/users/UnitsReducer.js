// frontend/src/components/SignupReducer.js

// import needed actions
import {
  CREATE_UNIT_ERROR,
  CREATE_UNIT_SUBMITTED,
  CREATE_UNIT_SUCCESS,
  GET_UNITS_REQUEST,
  GET_UNITS_SUCCESS,
  GET_UNITS_ERROR,
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
export const unitsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_UNITS_REQUEST:
      return {
        ...state,
        responseting: true,
      };
    case GET_UNITS_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        data: action.payload
      };
    case GET_UNITS_ERROR:
      return {
        ...state,
        responseting: false,
        success: false,
        messege: action.payload
      };
    case CREATE_UNIT_SUBMITTED:
      return {
        isSubimtted: true
      };
    case CREATE_UNIT_ERROR:
      const errorState = {
        isSubimtted: false
      };
      
    case CREATE_UNIT_SUCCESS:
      return {
        isSubimtted: false
      };
     
    default:
      return state;

  }
}