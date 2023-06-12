import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { allPostsReducer } from './reducers/homePostReducer';
import { myAllPosts } from './reducers/myDataReducer';

// Combine multiple reducers using combineReducers
const rootReducer = combineReducers({
  allHomePosts: allPostsReducer,
  myAllPosts: myAllPosts
  // Add other reducers here if you have any
});

// Apply middleware and compose enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;