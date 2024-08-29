import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  clearError,
} from './auth-actions';

const initialState = {
  auth: {
    user: { name: null, email: null },
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
};

const user = createReducer(initialState.auth.user, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialState.auth.user,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(initialState.auth.token, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
  [logoutError]: () => null,
  [getCurrentUserError]: () => null,
});


const setError = (_, { payload }) => payload;

const error = createReducer(initialState.auth.error, {
  [registerError]: setError,
  [loginError]: setError,
  [logoutError]: setError,
  [getCurrentUserError]: setError,
  [clearError]: () => initialState.auth.error,
});

const isAuthenticated = createReducer(initialState.auth.isAuthenticated, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
  [logoutSuccess]: () => false,
});

const loading = createReducer(initialState.auth.loading, {
  [registerRequest]: () => true,
  [registerSuccess]: () => false,
  [registerError]: () => false,
  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,
  [logoutRequest]: () => false,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

export default combineReducers({
  user,
  isAuthenticated,
  token,
  loading,
  error,
});
