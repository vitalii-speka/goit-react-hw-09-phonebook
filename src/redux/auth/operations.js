import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:8000/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
console.log(
  '🚀 ~ setAuthHeader ~ axios.defaults.headers.common.Authorization:',
  axios.defaults.headers.common.Authorization,
);

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'users',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/register', credentials);
      console.log('🚀 ~ res:', res);
      // After successful registration, add the token to the HTTP header
      // setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * POST @ /users/login
 * body: { email, password }

 */
export const logIn = createAsyncThunk(
  'users/login',
  async (credentials, thunkAPI) => {
    console.log('🚀 ~ thunkAPI:', thunkAPI);
    console.log('🚀 ~ credentials:', credentials);

    try {
      // const res = await axios.post("/users/login", credentials); _ GoIT
      const res = await axios.post('/users/login', credentials);
      console.log('🚀 ~ res:', res);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk(
  'users/logout',
  async (credentials, thunkAPI) => {
    console.log('🚀 ~ credentials:', credentials);
    try {
      await axios.post('/users/logout', credentials);
      // After a successful logout, remove the token from the HTTP header
      console.log('🚀 ~ before clearAuthHeader() line 73');
      clearAuthHeader();
    } catch (error) {
      console.log('🚀 ~ logOut ~ error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
    console.log('🚀 ~ credentials:', credentials);
    console.log('🚀 ~ credentials:', credentials);
    console.log('🚀 ~ credentials:', credentials);
  },
);
/*
 * logout for https://api.escuelajs.co/api/v1/auth/login
 */
// export const logOutButton = text => {};
export const logOutButton = createAsyncThunk(
  'auth/logoutButton',
  (_, thunkAPI) => {
    try {
      // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/me');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);