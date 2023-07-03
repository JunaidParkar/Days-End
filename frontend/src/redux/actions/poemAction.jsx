export const storePoem = (posts) => ({
  type: "STORE_POEM",
  payload: posts,
});

export const removePoem = (posts) => ({
  type: "REMOVE_POEM",
  payload: posts,
});
