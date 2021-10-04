// frontend/src/components/login/LoginActions.js

import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER, GET_PROFILEUSER_SUCCESS } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";

export const login = (userData, redirectTo) => dispatch => {
    axios
        .post("/api/v1/token/login/", userData)
        .then(response => {
            const { auth_token } = response.data;
            setAxiosAuthToken(auth_token);
            dispatch(setToken(auth_token));
            dispatch(getCurrentUser(redirectTo));
            
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError('Tên đăng nhập hoặc mật khẩu không đúng');
        });
};

export const getCurrentUser = redirectTo => dispatch => {
    axios
        .get("/api/v1/users/me/")
        .then(response => {
            const user = {
                id: response.data.id,
                username: response.data.username,
                groups: response.data.groups,
                last_login: response.data.last_login,
                date_joined: response.data.date_joined,
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                is_active: response.data.is_active,
                is_staff: response.data.is_staff,
                is_superuser: response.data.is_superuser,
            };
            dispatch(setCurrentUser(user, redirectTo));
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};

export const setCurrentUser = (user, redirectTo) => dispatch => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    });
    dispatch(getProfileUser(user.id));

    console.log("set user" + redirectTo);
    if (redirectTo !== "") {
        dispatch(push(redirectTo));
    }
};

export const getProfileUser = (id) => dispatch => {
    try {
      axios
        .get(`/api/v1/profile_user/${id}/`)
        .then(response => {
          dispatch({
            type: GET_PROFILEUSER_SUCCESS,
            payload: response.data
          });
        })
  
    } catch (error) {
        toastOnError(error);
    }
  
  };


export const setToken = token => dispatch => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};

export const unsetCurrentUser = () => dispatch => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
        type: UNSET_CURRENT_USER
    });
};

export const logout = () => dispatch => {
    axios
        .post("/api/v1/token/logout/")
        .then(response => {
            dispatch(unsetCurrentUser());
            dispatch(push("/"));
            toast.success("Đăng xuất thành công.");
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};


