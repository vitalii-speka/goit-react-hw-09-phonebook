import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.get('/contacts', credentials);
      return data.contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    const contacts = {
      name,
      number,
      // completed: false,
    };
    try {
      const { data } = await instance.post('/contacts', contacts);
      return data.contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, thunkAPI) => {
    try {
      // await instance.delete(`/contacts/${id}`);
      const res = await instance.delete(`/contacts/${id}`);
      return res.data.data.contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
