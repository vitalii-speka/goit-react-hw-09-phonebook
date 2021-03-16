import styles from './ContactForm.module.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getContacts, addContact } from '../../redux/phonebook';
import Alert from '../Alert';

const { v4: uuidv4 } = require('uuid');

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
