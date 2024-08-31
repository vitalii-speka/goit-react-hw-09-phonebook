import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  logOutButton,
} from "./operations";

const initialState = {
  user: { id: null, name: null, email: null, subscription: null, avatar: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutBut: {
      reducer(state, action) {
        state.user = { id: null, name: null, email: null };
        state.token = null;
        state.isRegisterIn = false;
        state.isLoggedIn = false;
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userData = action.payload.data;
        state.isRegisterIn = true;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRegisterIn = true;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = {
          id: null,
          name: null,
          email: null,
          subscription: null,
          avatar: null,
        };
        state.token = null;
        state.isRegisterIn = false;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRegisterIn = true;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logOutButton.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isRegisterIn = false;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logOutBut } = authSlice.actions;
