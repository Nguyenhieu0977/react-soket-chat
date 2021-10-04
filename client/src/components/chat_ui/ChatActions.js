import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_USER_CHAT, GET_ALL_USER_CHAT, GET_CHAT_MESSAGES, POST_CHAT_MESSAGES, REMOVE_GET_CHAT_MESSAGES, GET_CHAT_GROUPS_SUCCESS, GET_CHAT_GROUPS_LOAD, GET_CHAT_GROUPS_ERROR , GET_CHAT_GROUP } from "./ChatTypes";

const SOCKET_SERVER_URL = "http://localhost:4000";

export const getUserChat = () => async dispatch => {
  await axios
    .get("/api/v1/users/me")
    .then(response => {
      // console.log(response.data)
      dispatch({
        type: GET_USER_CHAT,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};


export const getChatGroups = () => async dispatch => {
  try {
    dispatch({ type: GET_CHAT_GROUPS_LOAD });

    await axios
      .get('/api/v1/chat_group/')
      .then(response => {
        dispatch({
          type: GET_CHAT_GROUPS_SUCCESS,
          payload: response.data
        });
      })
  } catch (error) {
    // toastOnError(error);
    dispatch({
      type: GET_CHAT_GROUPS_ERROR,
      message: error
    })
  }
};

export const getChatGroup = (id) => async dispatch => {
  await axios
    .get(`/api/v1/chat_group/${id}/`)
    .then(response => {
      // console.log(response.data)
      dispatch({
        type: GET_CHAT_GROUP,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const getMessages = (groupId) => async dispatch => {
  await axios
    .get(`/api/v1/chat_message/?chat_group=${groupId}`)
    .then(response => {
      dispatch({
        type: GET_CHAT_MESSAGES,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const postMessages = (messages) => async dispatch => {
  await axios
    .post('/api/v1/chat_message/', messages )
    .then(response => {
      dispatch({
        type: POST_CHAT_MESSAGES,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
export const removeGetMessages = () => dispatch => {
      dispatch({
        type: REMOVE_GET_CHAT_MESSAGES,
      });
};

// export const getMessages = (roomId) => async dispatch => {
//   await axios
//     .post(`${SOCKET_SERVER_URL}/rooms/${roomId}/messages`)
//     .then(response => {
//       dispatch({
//         type: GET_MESSAGES,
//         payload: response.data
//       });
//     })
//     .catch(error => {
//       toastOnError(error);
//     });
// };

// new functions
// export const deleteNote = id => dispatch => {
//   axios
//     .delete(`/api/v1/notes/${id}/`)
//     .then(response => {
//       dispatch({
//         type: DELETE_NOTE,
//         payload: id
//       });
//     })
//     .catch(error => {
//       toastOnError(error);
//     });
// };

// export const updateNote = (id, note) => dispatch => {
//   axios
//     .patch(`/api/v1/notes/${id}/`, note)
//     .then(response => {
//       dispatch({
//         type: UPDATE_NOTE,
//         payload: response.data
//       });
//     })
//     .catch(error => {
//       toastOnError(error);
//     });
// };



export const getAllUserChat = (roomId) => async dispatch => {
  await axios
  // const result = response.data.users;
    .get(`${SOCKET_SERVER_URL}/rooms/${roomId}/users`)
    .then(response => {
      // console.log(response.data)
      dispatch({
        type: GET_ALL_USER_CHAT,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
