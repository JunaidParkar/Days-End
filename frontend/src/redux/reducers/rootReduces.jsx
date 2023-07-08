import { combineReducers } from "redux";
import { reduxStoreHomeReducer } from "./all/homePostReducer";
import { reduxStoreAllPostReducer } from "./all/allPostReducer";
import { reduxStoreMyProfileReducer } from "./all/myProfileReducer";

// Combine multiple reducers using combineReducers
export const rootReducer = combineReducers({
  // allPost: storeAllPostReducer,
  // allUsers: storeAllUserReducer,
  // poem: storePoemReducer,
  // myData: myAllDataReducer,
  // authData: userDataReducer,
  // Add other reducers here if you have any
  posts: reduxStoreAllPostReducer,
  home: reduxStoreHomeReducer,
  myProfile: reduxStoreMyProfileReducer,
});
