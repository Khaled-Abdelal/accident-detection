import * as actionTypes from "../actions/types";
const initialState = {
  accident: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACCIDENT_START:
      return {
        ...state,
        accident: action.payload.accident
      };
    default:
      return state;
  }
}
