// src/redux/reducers.js
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
  } from './actionTypes';
  
  const initialState = {
    posts: {},
    loading: false,
    error: null
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_POSTS_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: { ...state.posts, ...action.payload },
          error: null
        };
      case FETCH_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;  