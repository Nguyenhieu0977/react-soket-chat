import { GET_USER_CHAT, GET_ALL_USER_CHAT, GET_CHAT_MESSAGES,POST_CHAT_MESSAGES, REMOVE_GET_CHAT_MESSAGES, GET_CHAT_GROUPS_SUCCESS, GET_CHAT_GROUPS_LOAD, GET_CHAT_GROUPS_ERROR, GET_CHAT_GROUP } from "./ChatTypes";

const initialState = {
  userChat: {},
  userchats: [],
  messages: [],
  // chatgroups: [],
};

export const chatUiReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const initialState2 = {
  responseting: false,
  success: false,
  messege: null,
  messages: [],
  chatgroups: [],
  chatgroup: {}
};

// define how action will change the state of the store
export const chatGroupReducer = (state = initialState2, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CHAT_GROUPS_LOAD:
      return {
        ...state,
        responseting: true,
      };
    case GET_CHAT_GROUPS_SUCCESS:
      return {
        ...state,
        responseting: false,
        success: true,
        chatgroups: action.payload
      };
    case GET_CHAT_GROUPS_ERROR:
      return {
        ...state,
        responseting: false,
        success: false,
        messege: action.payload
      };
    case GET_CHAT_GROUP:
      return {
        ...state,
        chatgroup: action.payload
      };
    case GET_CHAT_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
      case POST_CHAT_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
      case REMOVE_GET_CHAT_MESSAGES:
      return {
        state
      };
    default:
      return state;

  }
}
