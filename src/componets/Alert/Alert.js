// import React, { useCallback, useEffect } from 'react';

// import { useDispatch } from 'react-redux';
// import { clearError } from '../../redux/auth-old';
import '../../style/App.css';
import { CSSTransition } from 'react-transition-group';
import AlertDismissibleExample from '../../componets/AlertDismissibleExample';

export default function Alert({ text, alert }) {

  /* useEffect with old-redux-auth
  const dispatch = useDispatch();
  const onClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);


  useEffect(() => {
    if (text) {
      setTimeout(() => {
        console.log('🚀 ~ setTimeout ~ onClearError():', onClearError());
        onClearError();
      }, 1000);
    }
  }, [text, onClearError]);
    */

  return (
    <CSSTransition in={text} timeout={250} classNames="fade-scale" unmountOnExit>
      <AlertDismissibleExample text={alert} />
    </CSSTransition>
  );
}
