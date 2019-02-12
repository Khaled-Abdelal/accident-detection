import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_FROM_LOCAL_STORAGE,
  SIGN_OUT,
  ACCIDENT_START
} from "../actions/types";

export const loginStart = (name, password, loginMode) => {
  if (loginMode === "hospital") {
    return dispatch => {
      axios
        .post("/api/hospital/login", {
          hospitalName: name,
          password: password
        })
        .then(res => {
          dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(error => {
          dispatch({ type: LOGIN_FAIL, payload: error });
        });
    };
  } else if (loginMode === "user") {
    return dispatch => {
      axios
        .post("/api/user/login", {
          name,
          password
        })
        .then(res => {
          dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(error => {
          dispatch({ type: LOGIN_FAIL, payload: error });
        });
    };
  }
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getUserFromLocalStorage = () => {
  return {
    type: GET_USER_FROM_LOCAL_STORAGE
  };
};

export const accidentStart = accident => {
  return {
    type: ACCIDENT_START,
    payload: {
      accident
    }
  };
};
