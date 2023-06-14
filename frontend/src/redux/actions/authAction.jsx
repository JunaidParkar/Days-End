export const loginUserDataInRedux = (data) => ({
    type: 'STORE_AUTH_DATA',
    payload: data,
});

export const logoutUserDataInRedux = () => ({
    type: 'REMOVE_AUTH_DATA'
});
  