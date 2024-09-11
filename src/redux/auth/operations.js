import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const instance = axios.create({
  baseURL: 'https://nodejs-homework-rest-api-y0ve.onrender.com/api', // production
  // baseURL: 'http://localhost:8000/api',   // develop
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

export const register = createAsyncThunk(
  'users',
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post('/users/register', credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `${error.response.data.message}, code: ${error.response.data.code}`,
      );
    }
  },
);

export const logIn = createAsyncThunk(
  'users/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post('/users/login', credentials);
      token.set(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `${error.response.data.message}, code: ${error.response.data.code}`,
      );
    }
  },
);

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    const { data } = await instance.post('/users/logout');
    token.unset();
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `${error.response.data.message}, code: ${error.response.data.code}`,
    );
  }
});

export const refreshCurrentUser = createAsyncThunk(
  'auth/refreshCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;
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
  //localhost:8000/api/users/google
  http: export const signInGoogle = createAsyncThunk(
    '/users/google',
    async payload => {
      const res = await instance.get('/users/google');
      try {
        token.set(payload.usertoken);
        return payload;
      } catch (error) {
        return payload.rejectWithValue(error.message);
      }
    },
  );
*/
