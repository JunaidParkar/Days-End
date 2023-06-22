// reducer.js
let userData = {
  loggedIn: false,
  user: {},
  createdAt: "",
  followers: 0,
  following: 0,
  posts: 0,
  uid: "",
  userHandle: "",
  myPosts: {}
};

export const myAllDataReducer = (state = userData, action) => {
  switch (action.type) {
    case 'MY_ALL_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
