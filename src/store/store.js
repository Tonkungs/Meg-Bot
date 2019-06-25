import {  createStore,  applyMiddleware,  combineReducers} from "redux";
import {  composeWithDevTools} from "redux-devtools-extension";
// เอาไว้ดีเลย์
import thunk from "redux-thunk";
import fooReducer from "../reducers"

// const logger = store => next => action => {
const logger = () => next => action => {
  // console.group(action.type)
  // console.log('current state', store.getState())
  // console.log('dispatching', action)
  const result = next(action);
  // console.log('next state', store.getState())
  // console.groupEnd(action.type)
  return result;
};

const middlewares = [thunk, logger];

const store = createStore(combineReducers({
    foo: fooReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;