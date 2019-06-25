import { combineReducers } from "redux";
import { REQUEST_IN, ADD_COUNT, SUBTRACT_COUNT } from "../actions";

const countState = {
  count: 0,
  clicked: 0,
  data: {
    data: []
  }
};

const fooReducers = (state = countState, action) => {
  // console.log("action.type", action.type);
  // console.log("action.payload", action.payload);
  let newState = {}
  switch (action.type) {
    case REQUEST_IN:
      newState = {
        ...state,
        data: action.payload
      };
      
      break;
    case ADD_COUNT:
      newState = {
        ...state,
        count: state.count + 1,
        clicked: state.clicked + 1
      };
      break;
    case SUBTRACT_COUNT:
    newState = {
        ...state,
        count: state.count - 1,
        clicked: state.clicked + 1
      };
      break;
    default:
      return state;
  }

  return newState;
};
// /* eslint-disable no-param-reassign */
const fooReducer = combineReducers({
  fooReducers
});

export default fooReducer;
