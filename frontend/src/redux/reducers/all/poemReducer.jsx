// reducer.js
let initialState = {};

export const storePoemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POEM":
      return { ...state, ...action.payload };
    case "REMOVE_POEM":
      return { ...action.payload };
    default:
      return state;
  }
};
