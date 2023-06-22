// reducer.js
let initialState = {};

export const storeAllPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POSTS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
