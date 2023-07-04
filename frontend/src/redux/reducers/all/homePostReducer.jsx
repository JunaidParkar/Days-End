// reducer.js
let initialState = {
  posts: {},
  hasMore: true,
  lastId: "",
  likes: "",
};

export const storeAllPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POSTS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
