import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../componets/ContactForm';
import ContactList from '../../componets/ContactList';
import Filter from '../../componets/Filter';
import '../../style/App.css';
import ContactsTitle from '../../componets/ContactsTitle';

import {
  getisLoadingContacts,
  selectGetContacts,
  getContactsError,
} from '../../redux/contacts/selectors';

import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
import Alert from '../../componets/Alert';
import { useAuth } from '../../hooks';
import { getContacts } from '../../redux/contacts/operations';
import { instance } from '../../redux/auth/operations';

export default function ContactsPage() {
  const contacts = useSelector(selectGetContacts);
  const isLoadingContacts = useSelector(getisLoadingContacts);
  const errorContacts = useSelector(getContactsError);

  const {  token, user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;

      document.title = `Phonebook. Hi, ${user.name}`;
    }

    dispatch(getContacts());

    if (!token) {
      return () => {
        document.title = `phonebook`;
      };
    }
  }, [dispatch, token, user.name]);

  return (
    <div className="App">
      <h1>Contacts Page</h1>
      <ContactForm />
      {isLoadingContacts ? (
        <LinearIndeterminate />
      ) : (
        <>
          {contacts.length !== 0 ? (
            <>
              <ContactsTitle />
            </>
          ) : (
            <h2>in Phonebook, no contacts</h2>
          )}

          <Filter />
          <ContactList />
        </>
      )}
      {errorContacts && <Alert text={errorContacts} alert={errorContacts} />}
    </div>
  );
}
