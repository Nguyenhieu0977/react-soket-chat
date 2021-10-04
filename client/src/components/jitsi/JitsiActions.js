import { toastOnError } from "../../utils/Utils";
import { TOGGLE_AUDIO_ALL, TOGGLE_AUDIO, TOGGLE_VIDEO_ALL, TOGGLE_FULL_ALL, SET_JITSI_STORE, GET_MEET_ROOM } from "./JitsiTypes";
import axios from "axios";
export const setAudioAll = (stateAudioAll) => dispatch => {
  dispatch({
    type: TOGGLE_AUDIO_ALL,
    payload: stateAudioAll
  });
};
export const setAudio = (stateAudio) => dispatch => {
  dispatch({
    type: TOGGLE_AUDIO,
    payload: stateAudio
  });
};
export const setVideoAll = (stateVideoAll) => dispatch => {
  dispatch({
    type: TOGGLE_VIDEO_ALL,
    payload: stateVideoAll
  });
};

export const setFullAll = (stateFullAll) => dispatch => {
  dispatch({
    type: TOGGLE_FULL_ALL,
    payload: stateFullAll
  });
};

export const setJitsiStore = (jitsiStore) => dispatch => {
  dispatch({
    type: SET_JITSI_STORE,
    payload: jitsiStore
  });
};

export const getMeetRoom = (id) => async dispatch => {
  await axios
    .get(`/api/v1/room/${id}/`)
    .then(response => {
      // console.log(response.data)
      dispatch({
        type: GET_MEET_ROOM,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};