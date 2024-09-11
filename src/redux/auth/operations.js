import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const instance = axios.create({
  baseURL: 'https://nodejs-homework-rest-api-y0ve.onrender.com/api',
  // baseURL: 'http://localhost:8000/api',
});

const token = {
  set(token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    instance.defaults.headers.common['Authorization'] = ``;
  },
};

/* axios #2
axios.defaults.baseURL = 'http://localhost:8000/api';

// Utility to add JWT
export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
*/

export const clearError = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'users',
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post('/users/register', credentials);
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
    try {
      const res = await instance.post('/users/login', credentials);
      token.set(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkApi) => {
  const access_token = thunkApi.getState().auth.token;

  try {
    const { data } = await instance.post(
      '/users/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    // console.log('logout data', data)
    token.unset();
    return data.message;
  } catch (error) {
    return Promise.reject(error);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshCurrentUser = createAsyncThunk(
  'auth/refreshCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    console.log("🚀 ~ state:", state)
    const persistedToken = state.auth.token;
    console.log("🚀 ~ persistedToken:", persistedToken)
    if (persistedToken === null) {
      return thunkApi.rejectWithValue(state);
    }
    try {
      const { data } = await instance.get('/users/current');
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

/*next step => add Google login
  http://localhost:8000/api/users/google
export const signInGoogle = createAsyncThunk('/users/google', async payload => {
  console.log(
    '🚀 ~ signInGoogle ~ payload.redirect_uri:',
    payload.redirect_uri,
  );
  const res = await instance.get('/users/google');
  console.log('🚀 ~ signInGoogle ~ res:', res);
  // console.log('usertoken', usertoken)
  try {
    token.set(payload.usertoken);
    return payload;
  } catch (error) {
    console.log("🚀 ~ signInGoogle ~ error:", error)
    return payload.rejectWithValue(error.message);
  }
});
*/
