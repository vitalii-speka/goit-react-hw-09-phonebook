export const selectIsLoggedIn = state => {
  console.log('🚀 ~ selectIsLoggedIn ~ state:', state);
  return state.auth.isLoggedIn;
};

export const selectUser = state => {
  console.log('🚀 ~ selectUser ~ state:', state);
  return state.auth.user;
};

export const selectIsRefreshing = state => {
  console.log('🚀 ~ selectIsRefreshing ~ state:', state);
  return state.auth.isRefreshing;
};
export const selectIsToken = state => {
  console.log('🚀 ~ selectIsToken ~ state:', state);
  return state.auth.token;
};

