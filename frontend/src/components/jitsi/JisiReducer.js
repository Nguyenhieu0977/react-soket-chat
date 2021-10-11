import moment from 'moment';

import { TOGGLE_AUDIO_ALL, TOGGLE_AUDIO, SET_JITSI_STORE, TOGGLE_VIDEO_ALL, TOGGLE_FULL_ALL, GET_MEET_ROOM } from "./JitsiTypes";

const initialState = {
  jitsiState: {
    stateAudioAll: false,
    stateVideoAll: false,
    stateFullAll: false,
    stateTileViewAll: false,
    stateAudio: false,
    stateCamera: false,
    stateChat: false,
    stateCameraMirror: false,
    stateTileView: false,
    stateFull: false,
    stateRaiseHand: false,
    stateFilmStrip: false,
  },
  jitsiStrore: {},
  meetroom: {}
};

export const jitsiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JITSI_STORE:
      // console.log(action.payload)
      return {
        ...state,
        jitsiStrore: action.payload
      };
    case TOGGLE_AUDIO_ALL:
      // console.log(action.payload)
      return {
        ...state,
        stateAudioAll: action.payload
      };
    case TOGGLE_AUDIO:
      // console.log(action.payload)
      return {
        ...state,
        stateAudio: action.payload
      };

    case TOGGLE_VIDEO_ALL:
      // console.log(action.payload)
      return {
        ...state,
        stateVideoAll: action.payload
      };
    case TOGGLE_FULL_ALL:
      // console.log(action.payload)
      return {
        ...state,
        stateFullAll: action.payload
      };
      case GET_MEET_ROOM:
        return {
          ...state,
          meetroom: action.payload
        }
    default:
      return state;
  }
};


