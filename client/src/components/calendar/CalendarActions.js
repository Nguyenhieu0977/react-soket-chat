
import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { toast } from "react-toastify";
import { GET_CALENDARS, DETAIL_CALENDAR, ADD_CALENDAR, DELETE_CALENDAR, UPDATE_CALENDAR } from "./CalendarTypes";

export const getCalendar = () => async dispatch => {
  await axios
    .get("/api/v1/room/")
    .then(response => {
      dispatch({
        type: GET_CALENDARS,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const detailCalendar = (Id) => async dispatch => {
  await axios
    .get(`/api/v1/room/${Id}/`)
    .then(response => {
      dispatch({
        type: DETAIL_CALENDAR,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addCalendar = calendar => dispatch => {
  // console.log(calendar)
  axios
    .post("/api/v1/room/", calendar)
    .then(response => {
      dispatch({
        type: ADD_CALENDAR,
        payload: response.data
      });
      toast.success(
        "Tạo mới phòng họp thành công!"
      );
    })
    .catch(error => {
      toastOnError(error);
    });
};

// new functions
export const deleteCalendar = id => dispatch => {
  axios
    .delete(`/api/v1/room/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_CALENDAR,
        payload: id
      });
      toast.success(
        "Xóa phòng họp thành công!"
      );
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateCalendar = (Id, calendar) => dispatch => {

  console.log(Id)
  console.log(calendar)
  
  var url = `/api/v1/room/${Id}/`
  console.log(url)
  axios
    .patch(url, calendar)
    .then(response => {
      dispatch({
        type: UPDATE_CALENDAR,
        payload: response.data
      });
      toast.success(
        "Cập nhật phòng họp thành công!"
      );
    })
    .catch(error => {
      toastOnError(error);
    });
};
