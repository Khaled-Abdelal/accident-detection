import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_FROM_LOCAL_STORAGE,
  SIGN_OUT,
  ACCIDENT_START
} from "../actions/types";

export const loginStart = (name, password) => {
  return dispatch => {
    axios
      .post("/api/hospital/login", {
        hospitalName: name,
        password: password
      })
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        // localStorage.setItem("jwt-token-hospital", res.data.token);
        // localStorage.setItem(
        //   "loggedHospital",
        //   JSON.stringify(res.data.hospital)
        // );

        // this.setState({ toLogin: false, loggedHospital: res.data.hospital });

        // this.props.history.push("/dashboard");
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAIL, payload: error });
      });
  };
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
