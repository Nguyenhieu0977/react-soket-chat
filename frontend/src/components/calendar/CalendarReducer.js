// frontend/src/components/notes/NotesReducer.js

import { GET_CALENDARS, DETAIL_CALENDAR, ADD_CALENDAR, DELETE_CALENDAR, UPDATE_CALENDAR } from "./CalendarTypes";

const initialState = {
  calendars : [],
  calendarId : null
};

export const CalendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CALENDARS:
      return {
        ...state,
        calendars: action.payload
      };
    case DETAIL_CALENDAR:
      return {
        ...state,
        calendarId: action.payload
      };

    case ADD_CALENDAR:
      return {
        ...state,
        calendars: [...state.calendars, action.payload]
      };
    case DELETE_CALENDAR:
      return {
        ...state,
        calendars: state.calendars.filter((item, index) => item.Id !== action.payload)
      };
    case UPDATE_CALENDAR:
      const updatedCalendar = state.calendars.map(item => {
        if (item.Id === action.payload.Id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        calendars: updatedCalendar
      };
    default:
      return state;
  }
};
