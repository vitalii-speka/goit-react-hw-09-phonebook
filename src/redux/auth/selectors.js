export const selectisRegisterIn = state => {
  return state.auth.isRegisterIn;
};
export const selectIsLoading = state => {
  return state.auth.isLoading;
};
export const selectIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};
export const selectIsToken = state => {
  return state.auth.token;
};
export const selectUser = state => {
  return state.auth.user;
};
export const selectIsRefreshing = state => {
  return state.auth.isRefreshing;
};
export const selectIsError = state => {
  console.log("🚀 ~ selectIsError ~ state:", state)
  return state.auth.error;
};

