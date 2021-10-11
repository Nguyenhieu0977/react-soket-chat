// frontend/src/components/SignupReducer.js

// import needed actions
import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_REQUEST,
  UPDATE_PROFILES_SUCCESS,
  DELETE_PROFILE_SUCCESS,
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
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        data: action.payload
      };
    case UPDATE_PROFILES_SUCCESS:
      const updateProfile = state.data.map(p=>{
        if(action.payload.id === p.id){
          return { ...p, ...action.payload };
        }
        return p
      })
      return {
        ...state,
        data: updateProfile
      };
      case DELETE_PROFILE_SUCCESS:
        return {
          ...state,
          data: state.data.filter(p => p.id !== action.payload)
        };
      
     
    default:
      return state;

  }
}
