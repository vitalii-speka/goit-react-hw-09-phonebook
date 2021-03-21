import React, { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import '../../style/App.css';
import { CSSTransition } from 'react-transition-group';
import { clearError } from '../../redux/auth';
import AlertDismissibleExample from '../../componets/AlertDismissibleExample';

export default function Alert({ text, alert }) {
  const dispatch = useDispatch();

  const onClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        onClearError();
      }, 5000);
    }
  }, [alert, onClearError]);

  return (
    <CSSTransition
      in={text}
      timeout={250}
      classNames="fade-scale"
      unmountOnExit
    >
      <AlertDismissibleExample text={text} />
    </CSSTransition>
  );
}
