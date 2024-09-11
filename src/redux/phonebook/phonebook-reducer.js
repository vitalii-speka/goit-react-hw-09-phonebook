/* 
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchContactRequest,
  fetchContactSucces,
  fetchContactError,
  addContactRequest,
  addContactSucces,
  addContactError,
  removeContactRequest,
  removeContactSucces,
  removeContactError,
  changeFilter,
  clearFilterInput,
} from './phonebook-actions';
// import { logoutSuccess } from '../auth-old';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
};

const items = createReducer(initialState.contacts.items, {
  [fetchContactSucces]: (_, { payload }) => payload,
  [addContactSucces]: (state, { payload }) => {
    // console.log("🚀 30 ~ payload:", payload)
    return [payload.contact, ...state];
  },
  [removeContactSucces]: (state, { payload }) => {
    return state.filter(({ _id }) => _id !== payload);
  },
  // [logoutSuccess]: () => initialState.contacts.items,
});

const loading = createReducer(false, {
  [fetchContactRequest]: () => true,
  [fetchContactSucces]: () => false,
  [fetchContactError]: () => false,
  [addContactRequest]: () => true,
  [addContactSucces]: () => false,
  [addContactError]: () => false,
  [removeContactRequest]: () => true,
  [removeContactSucces]: () => false,
  [removeContactError]: () => false,
});

const filter = createReducer(initialState.contacts.filter, {
  [changeFilter]: (_, { payload }) => payload,
  [clearFilterInput]: () => initialState.contacts.filter,
});

const error = createReducer(initialState.contacts.error, {
  [fetchContactError]: (_, { payload }) => payload,
  [addContactError]: (_, { payload }) => payload,
  [removeContactError]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});


*/