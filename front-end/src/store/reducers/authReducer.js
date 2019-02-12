import * as actionTypes from "../actions/types";
import jwtDecode from "jwt-decode";
const initialState = {
  auth: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("auth-token", action.payload.token);
      const user = jwtDecode(action.payload.token);
      return {
        ...state,
        auth: user
      };
    case actionTypes.SIGN_OUT:
      localStorage.removeItem("auth-token");
      return {
        ...state,
        auth: null
      };

    case actionTypes.GET_USER_FROM_LOCAL_STORAGE:
      const token = localStorage.getItem("auth-token");
      const loggeduser = jwtDecode(token);
      return {
        ...state,
        auth: loggeduser
      };
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem("auth-token");
      return {
        ...state,
        auth: null
      };
    default:
      return state;
  }
}
