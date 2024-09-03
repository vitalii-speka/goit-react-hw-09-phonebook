// import React from 'react';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleContacts, removeContact } from '../../redux/phonebook';
import PropTypes from 'prop-types';
import './ContactList.css';

export default function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(getVisibleContacts);
  console.log('🚀 13 ~ ContactList ~ contacts getVisibleContacts:', contacts);

  return (
    <CSSTransition in={contacts.length > 0} timeout={250} classNames="fade">
      <TransitionGroup component="ul" className="TaskList">
        {contacts.map(({ _id: id, name, number }) => (
          <CSSTransition key={id} timeout={300}>
            <li className="TaskList_item">
              {name + ' : ' + number}
              {
                <div className="divRelativeButton">
                  <button
                    className="TaskList_button"
                    type="button"
                    name="delete"
                    onClick={() => {
                      dispatch(removeContact(id));
                    }}
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
}

ContactList.prototype = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
};
