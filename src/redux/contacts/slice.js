import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getContacts, addContact, removeContact } from './operations';

const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

const handlePending = (state, { payload }) => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getContacts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.items = state.items.filter(el => el._id !== action.payload._id);
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(getContacts.rejected, addContact.rejected),
        handleRejected,
      )
      .addMatcher(
        isAnyOf(getContacts.pending, addContact.pending),
        handlePending,
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
