import authReducer from "./authReducer";
import accidentReducer from "./accidentReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  accident: accidentReducer
});
