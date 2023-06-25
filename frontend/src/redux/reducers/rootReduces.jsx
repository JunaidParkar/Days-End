import { combineReducers } from "redux";
import { storeAllPostReducer } from "./all/homePostReducer";
import { storeAllUserReducer } from "./all/allUserReducer";

// Combine multiple reducers using combineReducers
export const rootReducer = combineReducers({
  allPost: storeAllPostReducer,
  allUsers: storeAllUserReducer,
  // myData: myAllDataReducer,
  // authData: userDataReducer,
  // Add other reducers here if you have any
});
