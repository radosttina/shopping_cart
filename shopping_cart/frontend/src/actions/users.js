import axios from "axios";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, LOGIN_FAIL } from "./types.js";

export const tokenConfig = getState => {
    const token = getState().user.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}

export const registerUser = (user) => (dispatch) => {
  axios.post("/api/auth/register", user)
    .then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (user) => (dispatch) => {
    axios.post("api/auth/login", user)
    .then((res) => {
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        })
    })
    .catch((err) => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logoutUser = () => (dispatch, getState) => {
    axios.post("api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: LOGOUT_USER,
            payload: res.data
        })
    })
}