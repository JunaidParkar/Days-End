// reducer.js
let initialState = {
  hasMore: true,
  lastId: "no",
};

export const reduxStoreHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_HOME":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
