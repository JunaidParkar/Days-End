export const addUserData = (data) => ({
  type: "STORE_USER_DATA",
  payload: data,
});

export const removeUserData = () => ({
  type: "REMOVE_USER_DATA",
});
