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
import { getUserName, getIsToken } from '../../redux/auth';

import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
import Alert from '../../componets/Alert';

export default function ContactsPage() {
  const contacts = useSelector(getContacts);
  console.log("🚀 ~ ContactsPage ~ contacts:", contacts)
  const isLoadingContacts = useSelector(getLoadingContacts);
  console.log("🚀 ~ ContactsPage ~ isLoadingContacts:", isLoadingContacts)
  const errorContacts = useSelector(getContactsError);
  console.log("🚀 ~ ContactsPage ~ errorContacts:", errorContacts)
  const name = useSelector(getUserName);
  console.log("🚀 ~ ContactsPage ~ name:", name)
  const isTokenAuth = useSelector(getIsToken);
  console.log("🚀 ~ ContactsPage ~ isTokenAuth:", isTokenAuth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
    if (isTokenAuth) {
      document.title = `Phonebook. Hi, ${name}`;
    }

    if (!isTokenAuth) {
      return () => {
        document.title = `phonebook`;
      };
    }
  }, [dispatch, isTokenAuth, name]);

  return (
    <div className="App">
      <h1>Contacts Page</h1>
      {/* <ContactForm />
      {contacts.length !== 0 ? (
        <ContactsTitle />
      ) : (
        <h2>in Phonebook, no contacts</h2>
      )}
      {isLoadingContacts && <LinearIndeterminate />}
      {errorContacts && <Alert text={errorContacts} alert={errorContacts} />}
      <Filter />
      <ContactList /> */}
    </div>
  );
}
