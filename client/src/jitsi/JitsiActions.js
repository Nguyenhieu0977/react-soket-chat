import { toastOnError } from "../../utils/Utils";
import { TOGGLE_AUDIO_ALL, TOGGLE_VIDEO_ALL, TOGGLE_FULL_ALL, SET_JITSI_STORE } from "./JitsiTypes";

export const setAudioAll = (audioAllJitsi) => dispatch => {
  dispatch({
    type: TOGGLE_AUDIO_ALL,
    payload: audioAllJitsi
  });
};
export const setVideoAll = (videoAllJitsi) => dispatch => {
  dispatch({
    type: TOGGLE_VIDEO_ALL,
    payload: videoAllJitsi
  });
};

export const setFullAll = (fullAllJitsi) => dispatch => {
  dispatch({
    type: TOGGLE_FULL_ALL,
    payload: fullAllJitsi
  });
};

export const setJitsiStore = (jitsiStore) => dispatch => {
  dispatch({
    type: SET_JITSI_STORE,
    payload: jitsiStore
  });
};

// // new functions
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
