import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  CLEAR_ERRORS
} from "./types";

// add post
export const addPost = postData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("./api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  // dispatch(clearErrors());
  axios
    .get("./api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Set Loading State
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
