import { GET_USER_CHAT, GET_ALL_USER_CHAT, GET_MESSAGES } from "./ChatTypes";

const initialState = {
  userChat : {},
  userchats: [],
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CHAT:
      return {
        ...state,
        userChat: action.payload
      };
      case GET_ALL_USER_CHAT:
      return {
        ...state,
        userchats: [...state.userchats, action.payload]
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    // case UPDATE_NOTE:
    //   const updatedNotes = state.notes.map(item => {
    //     if (item.id === action.payload.id) {
    //       return { ...item, ...action.payload };
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     notes: updatedNotes
    //   };
    default:
      return state;
  }
};
