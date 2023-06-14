import { combineReducers } from 'redux';
import { allPostsReducer } from './homePostReducer';
import { myAllDataReducer } from './myDataReducer';
import { authReducer } from './authReducer';

// Combine multiple reducers using combineReducers
export const rootReducer = combineReducers({
  appPost: allPostsReducer,
  myData: myAllDataReducer,
  authData: authReducer
  // Add other reducers here if you have any
});