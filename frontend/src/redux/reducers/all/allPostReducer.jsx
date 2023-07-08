let initialState = {};

export const reduxStoreAllPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ALL_POSTS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
