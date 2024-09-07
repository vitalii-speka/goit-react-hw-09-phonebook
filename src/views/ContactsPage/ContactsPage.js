import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../componets/ContactForm';
import ContactList from '../../componets/ContactList';
import Filter from '../../componets/Filter';
import '../../style/App.css';
import ContactsTitle from '../../componets/ContactsTitle';
import {
  getLoadingContacts,
  getContacts,
  fetchContact,
  getContactsError,
} from '../../redux/phonebook';

import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
import Alert from '../../componets/Alert';
import { useAuth } from '../../hooks';
// import { tokenInstance } from '../../redux/auth/operations';

export default function ContactsPage() {
  const contacts = useSelector(getContacts);
  const isLoadingContacts = useSelector(getLoadingContacts);
  const errorContacts = useSelector(getContactsError);

  const { token, user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    
    if (token) {
      // tokenInstance.set(token);

      document.title = `Phonebook. Hi, ${user.name}`;
    }
    
    dispatch(fetchContact());

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
      {contacts.length !== 0 ? (
        <ContactsTitle />
      ) : (
        <h2>in Phonebook, no contacts</h2>
      )}
      {isLoadingContacts && <LinearIndeterminate />}
      {errorContacts && <Alert text={errorContacts} alert={errorContacts} />}
      <Filter />
      <ContactList />
    </div>
  );
}
