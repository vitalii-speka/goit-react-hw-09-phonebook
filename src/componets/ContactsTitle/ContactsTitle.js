import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../style/App.css';

const ContactsTitle = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <h2>Contacts</h2>
    </CSSTransition>
  );
};

export default ContactsTitle;
