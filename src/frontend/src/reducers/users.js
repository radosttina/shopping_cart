import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, LOGIN_FAIL } from "../actions/types";
import { bindActionCreators } from "redux";

const initialState = {
    isAuthenticated: false,
    token: null,
    username: null,
    is_superuser: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.user.username,
        is_superuser: action.payload.user.is_superuser
      };
    case LOGIN_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        username: null,
        is_superuser: false
      };
    default:
      return state;
  }
}
