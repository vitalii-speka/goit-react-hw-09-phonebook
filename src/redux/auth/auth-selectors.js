export const getIsToken = state => state.auth.token;

export const getUserName = state => state.auth.user.name;

export const getAuthError = state => state.auth.error;

export const getAuthLoading = state => state.auth.loading;

export const getIsAuthenticated = state => state.auth.token;

/* вариант Репеты
export const getIsAuthenticated = state => state.auth.isAuthenticated;
*/
