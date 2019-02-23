import * as actionTypes from "../actions/types";
const initialState = {
  accident: null,
  address: null,
  route: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACCIDENT_START:
      return {
        ...state,
        accident: action.payload.accident
      };
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        route: action.payload.route
      };
    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address
      };
    default:
      return state;
  }
}
