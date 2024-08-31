export const selectIsLoggedIn = state => {
  // console.log('🚀 ~ selectIsLoggedIn ~ state:', state);
  return state.auth.isLoggedIn;
};
export const selectisRegisterIn = state => {
  return state.auth.isRegisterIn;
};

export const selectUser = state => {
  return state.auth.user;
};

export const selectIsRefreshing = state => {
  // console.log('🚀 ~ selectIsRefreshing ~ state:', state);
  return state.auth.isRefreshing;
};
export const selectIsToken = state => {
  // console.log('🚀 ~ selectIsToken ~ state:', state);
  return state.auth.token;
};

