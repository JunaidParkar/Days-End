let initialState = {};

export const reduxStoreMyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_MY_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
