// reducer.js
let userData = {
  datas: {
    userHandle: "junaid",
    createdAt: "2023-06-10T14:12:51.886Z",
    uid: "Zbf78ISvZZPtRj4dtXVjtzRCCET2",
    followers: 0,
    following: 0,
    posts: 22
  },
  posts: {},
  likes: [],
  comments: [],
  notification: []
};

export const myAllPosts = (state = userData, action) => {
  switch (action.type) {
    case 'MY_ALL_POSTS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
