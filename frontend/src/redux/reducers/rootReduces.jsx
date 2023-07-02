import { combineReducers } from "redux";
import { storeAllPostReducer } from "./all/homePostReducer";
import { storeAllUserReducer } from "./all/allUserReducer";
import { storePoemReducer } from "./all/poemReducer";

// Combine multiple reducers using combineReducers
export const rootReducer = combineReducers({
  allPost: storeAllPostReducer,
  allUsers: storeAllUserReducer,
  poem: storePoemReducer,
  // myData: myAllDataReducer,
  // authData: userDataReducer,
  // Add other reducers here if you have any
});
