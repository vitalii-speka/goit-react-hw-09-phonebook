import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../componets/ContactForm/ContactForm.module.css';
import { CSSTransition } from 'react-transition-group';
import { logIn } from '../../redux/auth/operations';
import { useAuth } from '../../hooks';

import Alert from '../../componets/Alert';
import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
// import { signInGoogle } from '../../redux/auth/operations';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, isRegisterIn, user, errorAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = useCallback(e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const alertReset = () => {
        setAlertError(false);
        setNotification(null);
      };

      const alertNotifocation = notification => {
        setAlertError(true);
        setNotification(notification);

        setTimeout(alertReset, 2500);
      };

      if (email === '') {
        alertNotifocation('Please enter email');
        return;
      }

      if (password === '') {
        alertNotifocation(`Please enter password`);
        return;
      }

      dispatch(logIn({ email: email, password: password }));

      setEmail('');
      setPassword('');
      setAlertError(false);
      setNotification(null);
    },
    [dispatch, email, password],
  );

  /*
  const onSignInGoogle = useCallback(() => {
    dispatch(signInGoogle());
  }, [dispatch]);
  */

  return (
    <>
      {isLoading ? (
        <>
          <LinearIndeterminate />
          <Alert
            text={isLoading}
            alert={'Please wait, sending a request'}
            variant={'secondary'}
          />
        </>
      ) : (
        <CSSTransition
          in={true}
          appear={true}
          timeout={250}
          classNames="fade-scale"
          unmountOnExit
        >
          <div>
            {isRegisterIn && <h2>Hi {user.name}</h2>}
            <h2>Enter your Login and Password</h2>
            <form onSubmit={handleSubmit} className={styles.TaskEditor}>
              <label className={styles.TaskEditor_label}>
                Email
                <input
                  className={styles.TaskEditor_input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </label>

              <label className={styles.TaskEditor_label}>
                Password
                <input
                  className={styles.TaskEditor_input}
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>

              <button className={styles.TaskEditor_button} type="submit">
                Log In
              </button>
              {/* <button
              className={styles.TaskEditor_button}
              onClick={onSignInGoogle}
            >
              Continue with Google
            </button> */}
            </form>
          </div>
        </CSSTransition>
      )}

      <Alert text={alertError} alert={notification} variant={'info'} />

      {errorAuth && <Alert text={true} alert={errorAuth} variant={'danger'} />}
    </>
  );
}
