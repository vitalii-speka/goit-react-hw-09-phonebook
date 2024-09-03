import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  isRegisterIn: false,
  isLoading: false,
  isLoggedIn: false,
  token: null,
  user: { id: null, name: null, email: null, subscription: null, avatar: null },
  isRefreshing: false,
  error: null,
};

const handlePending = (state, { payload }) => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRegisterIn = true;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRegisterIn = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isRegisterIn = false;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRegisterIn = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logOut.pending, logIn.pending),
        handlePending,
      )

      .addMatcher(isAnyOf(register.rejected, logIn.rejected), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
