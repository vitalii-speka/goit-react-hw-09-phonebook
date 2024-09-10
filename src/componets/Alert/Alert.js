import React from 'react';
import '../../style/App.css';
import { CSSTransition } from 'react-transition-group';
import AlertDismissibleExample from '../../componets/AlertDismissibleExample';

export default function Alert({ text, alert }) {

  return (
    <CSSTransition in={text} timeout={250} classNames="fade-scale" unmountOnExit>
      <AlertDismissibleExample text={alert} />
    </CSSTransition>
  );
}
