import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_USER_CHAT, GET_ALL_USER_CHAT, GET_MESSAGES } from "./ChatTypes";

const SOCKET_SERVER_URL = "http://localhost:4000";

export const getUserChat = () => dispatch => {
  axios
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

export const getAllUserChat = (roomId) => dispatch => {
  axios
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

export const getMessages = (roomId) => dispatch => {
  axios
    .post(`${SOCKET_SERVER_URL}/rooms/${roomId}/messages`)
    .then(response => {
      dispatch({
        type: GET_MESSAGES,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

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
