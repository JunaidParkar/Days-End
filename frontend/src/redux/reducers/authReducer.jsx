// reducer.js
let authData = {
    loggedIn: false,
    uid: "",
    email: "",
    photo: "",
    emailVerified: "",
    handle: ""
};

let defaultState = {
    loggedIn: false,
    uid: "",
    email: "",
    photo: "",
    emailVerified: "",
    handle: ""
};
  
export const authReducer = (state = authData, action) => {
    switch (action.type) {
        case 'STORE_AUTH_DATA':
            return { ...state, ...action.payload };
        case 'REMOVE_AUTH_DATA':
            return { ...state, ...defaultState }
        default:
            return state;
    }
};
  