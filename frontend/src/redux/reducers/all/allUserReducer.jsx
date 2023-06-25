let initialState = [];

export const storeAllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ALL_USERS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
