export const REQUEST_IN = "REQUEST_IN";
export const ADD_COUNT = "ADD_COUNT";
export const SUBTRACT_COUNT = "SUBTRACT_COUNT";

export const resivePosts = payload =>
  // console.log("resivePosts", payload);
  ({
    type: REQUEST_IN,
    payload
  });

export const addCount = payload =>
  // console.log("addCount", payload);
  ({
    type: ADD_COUNT,
    payload
  });

export const subCount = payload =>
  // console.log("subCount", payload);
  ({
    type: SUBTRACT_COUNT,
    payload
  });

// const fetchPosts = subreddit => dispatch => fetch("https://murmuring-citadel-13024.herokuapp.com/api/v1/iguser", {

const fetchPosts = () => dispatch => fetch("", {
    mode: "cors"
  })
  .then(response => response.json())
  .then(res => {
    // console.log(res);
    dispatch(resivePosts(res));
  });
// const addCountS = subreddit => dispatch => dispatch(addCount({}));
const addCountS = () => dispatch => dispatch(addCount({}));
// const subCountS = subreddit => dispatch => dispatch(subCount({}));
const subCountS = () => dispatch => dispatch(subCount({}));

// export const getFetchPost = subreddit => (dispatch, getState) =>
export const getFetchPost = subreddit => (dispatch) =>
  // console.log(getState());
  dispatch(fetchPosts(subreddit));
// export const postAddCount = subreddit => (dispatch, getState) =>
// console.log(getState());
export const postAddCount = subreddit => (dispatch) =>
  // console.log("dispatch", dispatch);
  dispatch(addCountS(subreddit));

// export const postSubCount = subreddit => (dispatch, getState) =>
export const postSubCount = subreddit => (dispatch) =>
  // console.log(getState());
  dispatch(subCountS(subreddit));