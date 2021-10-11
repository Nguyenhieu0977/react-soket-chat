// frontend/src/components/signup/SignupActions.js
import axios from "axios";
import { toast } from "react-toastify";
import { toastOnError } from "../../utils/Utils";
// import { isEmpty } from "../../utils/Utils";
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUBMITTED,
  UPDATE_USER_SUCCESS,
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_SUBMITTED,
  CREATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUBMITTED,
  UPDATE_PROFILE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_REQUEST,
  GET_PROFILES_ERROR,
  GET_PROFILE_UNIT_SUCCESS,
  GET_PROFILE_UNIT_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_ERROR,
  RESETPASSWORD_SUCCESS,
  GET_UNITS_SUCCESS,
  GET_UNITS_REQUEST,
  GET_UNITS_ERROR,

} from "./UserTypes";

export const createUser = userData => dispatch => {
  dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
  axios
    .post("/api/v1/register", userData)
    .then(response => {
      toast.success(
        // "Tài khoản " +  userData.username + " được tạo thành công."
        "Tài khoản được tạo thành công."
      );
      dispatch({ 
        type: CREATE_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      if (error.resposne) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CREATE_USER_ERROR,
          errorData: error.response.data
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const resetPassword = dataReset => dispatch => {
  dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
  axios
    .post("/api/v1/users/set_password/", dataReset)
    .then(response => {
      toast.success(
        "Thay đổi mật khẩu thành công."
      );
      dispatch({ type: RESETPASSWORD_SUCCESS });
    })
    .catch(error => {
        toast.error("Mật khẩu phải bao gồm chủ cái, số, và ký tự đặc biệt và có độ dài 8 ký tự trở lên!");
    });
};

export const updateUser = (id, userData) => dispatch => {
  dispatch({ type: UPDATE_USER_SUBMITTED }); // set submitted state
  axios
    .put("/api/v1/register", (id, userData))
    .then(response => {
      toast.success(
        "Tài khoản " +
        userData.username +
        " được tạo thành công. Xin mời đăng nhập."
      );
      dispatch({ type: UPDATE_USER_SUCCESS });
    })
    .catch(error => {
      if (error.resposne) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: UPDATE_USER_ERROR,
          errorData: error.response.data
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    await axios
      .get("/api/v1/users/")
      .then(response => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: response.data
        });
      })

  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_USERS_ERROR,
      message: error
    })
  }

};

export const deleteUser = (username) => async dispatch => {
  try {
    await axios
      .delete(`/api/v1/users/${username}/`)
      .then(response => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: username
        });
      })

  } catch (error) {
    console.log(error)
    dispatch({
      type: DELETE_USER_ERROR,
      message: error
    })
  }

};

// export const getProfiles = (unit_id) => async dispatch => {
export const getProfiles = () => async dispatch => {
  try {
    dispatch({ type: GET_PROFILES_REQUEST });

    await axios
      .get('/api/v1/profiles/')
      .then(response => {
        dispatch({
          type: GET_PROFILES_SUCCESS,
          payload: response.data
        });
      })

  } catch (error) {
    dispatch({
      type: GET_PROFILES_ERROR,
      message: error
    })
  }

};

export const getProfileUnit = (unit_id) => async dispatch => {
  try {
    dispatch({ type: GET_PROFILES_REQUEST });
    await axios
      .get(`/api/v1/profiles/${unit_id}`)
      .then(response => {
        dispatch({
          type: GET_PROFILES_SUCCESS,
          payload: response.data
        });
      })

  } catch (error) {
    dispatch({
      type: GET_PROFILES_ERROR,
      message: error
    })
  }

};

export const getProfile = (id) => async dispatch => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    await axios
      .get(`/api/v1/profile_user/${id}/`)
      .then(response => {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response.data
        });
      })

  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERROR,
      message: error
    })
  }

};

export const updateProfile = (id, userData) => async dispatch => {
  // console.log(userData)
  await axios
    .patch(`/api/v1/profile/${id}/`, userData)
    
    .then(response => {
      toast.success(
        "Cập nhật tài khoản thành công."
      );
      dispatch({ 
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data
      });
    })
    // .catch(error => {
    //   if (error.resposne) {
    //     toast.error(JSON.stringify(error.response.data));
    //     dispatch({
    //       type: UPDATE_PROFILE_ERROR,
    //       errorData: error.response.data
    //     });
    //   } else if (error.message) {
    //     toast.error(JSON.stringify(error.message));
    //   } else {
    //     toast.error(JSON.stringify(error));
    //   }
    // });
    .catch(error => {
      toastOnError(error);
    });
};

export const deleteProfile = (id) => async dispatch => {
  await axios
    .delete(`/api/v1/profile/${id}/`)
    .then(response => {
      toast.success(
        "Xóa tài khoản thành công."
      );
      dispatch({ 
        type: DELETE_PROFILE_SUCCESS,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};


export const getUnits = () => async dispatch => {
  try {
    dispatch({ type: GET_UNITS_REQUEST });

    await axios
      .get("/api/v1/unit/")
      .then(response => {
        dispatch({
          type: GET_UNITS_SUCCESS,
          payload: response.data
        });
      })

  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_UNITS_ERROR,
      message: error
    })
  }

};
