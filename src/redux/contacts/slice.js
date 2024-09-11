import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getContacts, addContact, removeContact } from './operations';

const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

const handlePending = (state, _) => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
    clearFilterInput(state, _) {
      state.filter = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getContacts.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(el => el._id !== payload._id);
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

export const { changeFilter, clearFilterInput } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
