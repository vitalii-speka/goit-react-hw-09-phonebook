import { createSelector } from '@reduxjs/toolkit';

export const getisLoadingContacts = state => state.contacts.isLoading;

export const selectGetContacts = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;

export const getContactsError = state => state.contacts.error;

export const getVisibleContacts = createSelector(
  [selectGetContacts, getFilter],
  (contacts, filter) => {
    const normalazideFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazideFilter),
    );
  },
);
