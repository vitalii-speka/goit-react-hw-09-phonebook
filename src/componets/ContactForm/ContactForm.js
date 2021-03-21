import styles from './ContactForm.module.css';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getContacts, addContact } from '../../redux/phonebook';
import Alert from '../Alert';

const { v4: uuidv4 } = require('uuid');

export default function ContactForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [notification, setNotification] = useState(null);

  const contacts = useSelector(getContacts);

  const handleCheange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const alertReset = () => {
    setAlertError(false);
    setNotification(null);
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const alertNotifocation = notification => {
        setAlertError(true);
        setNotification(notification);

        setTimeout(alertReset, 2500);
      };

      if (name === '') {
        alertNotifocation('Please enter contact name');
        return;
      }

      if (number === '') {
        alertNotifocation('Please enter contact number');
        return;
      }

      if (contacts.some(contact => contact.name === name)) {
        alertNotifocation(`${name} is already in contacts`);
        return;
      }

      dispatch(addContact({ name, number }));
      reset();
    },
    [dispatch, name, number, contacts],
  );

  const reset = () => {
    setName('');
    setNumber('');
    setAlertError(false);
    setNotification(null);
  };

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={250}
        classNames="fade-scale"
        unmountOnExit
      >
        <form className={styles.TaskEditor} onSubmit={handleSubmit}>
          <label className={styles.TaskEditor_label} htmlFor={nameInputId}>
            <p className={styles.TaskEditor_inputTitle}>Name</p>
            <input
              className={styles.TaskEditor_input}
              type="text"
              name="name"
              value={name}
              onChange={handleCheange}
            />
          </label>
          <label className={styles.TaskEditor_label} htmlFor={numberInputId}>
            <p className={styles.TaskEditor_inputTitle}>Number</p>
            <input
              className={styles.TaskEditor_input}
              type="number"
              name="number"
              value={number}
              onChange={handleCheange}
            />
            <button className={styles.TaskEditor_button} type="submit">
              Add contact
            </button>
          </label>
        </form>
      </CSSTransition>

      <Alert text={notification} alert={alertError} />
    </>
  );
}

/* to 

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleCheange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  alertNotifocation = notification => {
    this.setState({
      alertError: true,
      notification,
    });
    setTimeout(this.alertReset, 2500);
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name === '') {
      this.alertNotifocation('Please enter contact name');
      return;
    }

    if (this.state.number === '') {
      this.alertNotifocation('Please enter contact number');
      return;
    }

    if (this.props.contacts.some(contact => contact.name === this.state.name)) {
      this.alertNotifocation(`${this.state.name} is already in contacts`);
      return;
    }

    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  alertReset = () => {
    this.setState({ alertError: false, notification: null });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
      alertError: false,
      notification: null,
    });
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  render() {
    const { alertError, notification } = this.state;

    return (
      <>
        <CSSTransition
          in={true}
          appear={true}
          timeout={250}
          classNames="fade-scale"
          unmountOnExit
        >
          <form className={styles.TaskEditor} onSubmit={this.handleSubmit}>
            <label
              className={styles.TaskEditor_label}
              htmlFor={this.nameInputId}
            >
              <p className={styles.TaskEditor_inputTitle}>Name</p>
              <input
                className={styles.TaskEditor_input}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleCheange}
              />
            </label>
            <label
              className={styles.TaskEditor_label}
              htmlFor={this.numberInputId}
            >
              <p className={styles.TaskEditor_inputTitle}>Number</p>
              <input
                className={styles.TaskEditor_input}
                type="number"
                name="number"
                value={this.state.number}
                onChange={this.handleCheange}
              />
              <button className={styles.TaskEditor_button} type="submit">
                Add contact
              </button>
            </label>
          </form>
        </CSSTransition>

        <Alert text={notification} alert={alertError} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contacts => dispatch(addContact(contacts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

*/
