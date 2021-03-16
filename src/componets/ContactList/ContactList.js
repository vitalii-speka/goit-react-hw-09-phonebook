import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getVisibleContacts, removeContact } from '../../redux/phonebook';
import PropTypes from 'prop-types';
import './ContactList.css';

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <CSSTransition in={contacts.length > 0} timeout={250} classNames="fade">
      <TransitionGroup component="ul" className="TaskList">
        {contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={300}>
            <li className="TaskList_item">
              {contact.name + ' : ' + contact.number}
              {
                <div className="divRelativeButton">
                  <button
                    className="TaskList_button"
                    type="button"
                    name="delete"
                    onClick={() => onRemoveContact(contact.id)}
                  >
                    delete
                  </button>
                </div>
              }
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </CSSTransition>
  );
};

ContactList.prototype = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
};

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: id => dispatch(removeContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
