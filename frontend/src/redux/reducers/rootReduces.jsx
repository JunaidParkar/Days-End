import { combineReducers } from "redux";
import { storeAllPostReducer } from "./all/homePostReducer";

// Combine multiple reducers using combineReducers
export const rootReducer = combineReducers({
  allPost: storeAllPostReducer,
  // myData: myAllDataReducer,
  // authData: userDataReducer,
  // Add other reducers here if you have any
});
