// src/redux/actions.js
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
  } from './actionTypes';
  
  export const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST
  });
  
  export const fetchPostsSuccess = (data) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: data
  });
  
  export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error
  });
  