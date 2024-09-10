import { createSelector } from '@reduxjs/toolkit';

export const getisLoadingContacts = state => state.contacts.isLoading;

export const selectGetContacts = state => {
  return state.contacts.items
}
export const getFilter = state => state.contacts.filter;

export const getContactsError = state => state.contacts.error;

export const productsSelector = state =>
  [...state.products.products].sort((a, b) => a.price - b.price);

export const getVisibleContacts = createSelector(
  [selectGetContacts, getFilter],
  (contacts, filter) => {
    const normalazideFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazideFilter),
    );
  },
);
