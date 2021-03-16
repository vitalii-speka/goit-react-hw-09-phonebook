import { createSelector } from '@reduxjs/toolkit';

export const getLoadingContacts = state => state.contacts.loading;

export const getContacts = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;

export const getContactsError = state => state.contacts.error;

export const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalazideFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazideFilter),
    );
  },
);
