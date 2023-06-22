// reducer.js
let userData = {};

let defaultState = {
  // loggedIn: false,
  // uid: "",
  // email: "",
  // photo: "",
  // emailVerified: "",
  // handle: ""
};

export const userDataReducer = (state = userData, action) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return { ...state, ...action.payload };
    case "REMOVE_USER_DATA":
      return { ...state, ...defaultState };
    default:
      return state;
  }
};
