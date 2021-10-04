import moment from 'moment';

import { TOGGLE_AUDIO_ALL, SET_JITSI_STORE, TOGGLE_VIDEO_ALL, TOGGLE_FULL_ALL } from "./JitsiTypes";

const initialState = {
  audioAllJitsi: true,
  videoAllJitsi: true,
  fullAllJitsi: true,
  jitsiStrore: {},
};

export const jitsiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AUDIO_ALL:
      // console.log(action.payload)
      return {
        ...state,
        audioAllJitsi: action.payload
      };
    case SET_JITSI_STORE:
      // console.log(action.payload)
      return {
        ...state,
        jitsiStrore: action.payload
      };
    case TOGGLE_VIDEO_ALL:
      // console.log(action.payload)
      return {
        ...state,
        videoAllJitsi: action.payload
      };
    case TOGGLE_FULL_ALL:
      // console.log(action.payload)
      return {
        ...state,
        fullAllJitsi: action.payload
      };
    default:
      return state;
  }
};


