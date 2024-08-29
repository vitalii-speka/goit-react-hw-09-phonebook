import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  logOutButton,
} from "./operations";

const initialState = {
  user: { name: null, email: null },
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
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        console.log("🚀 ~ .addCase ~ state:", state)
        state.user = action.payload.user;
        state.userData = action.payload.data;
        // state.user = action.payload.data;
        // state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        console.log("🚀 ~ .addCase ~ state:", state)
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logOutButton.fulfilled, state => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logOutBut } = authSlice.actions;
