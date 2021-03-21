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

export default function ContactsPage() {
  const contacts = useSelector(getContacts);
  const isLoadingContacts = useSelector(getLoadingContacts);
  const errorContacts = useSelector(getContactsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

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

/* to

class ContactsPage extends Component {
  componentDidMount() {
    this.props.fetchContact();
  }

  render() {
    const { contacts, isLoadingContacts, errorContacts } = this.props;

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
}

const mapStateToProps = state => ({
  contacts: getContacts(state),
  isLoadingContacts: getLoadingContacts(state),
  errorContacts: getContactsError(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContact: () => dispatch(fetchContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
*/
