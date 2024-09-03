import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './RegisterPage.css';
import '../../componets/AppBar/AppBar.css';
// import { getAuthError, getAuthLoading } from '../../redux/auth-old';
import { register } from '../../redux/auth/operations';
import Alert from '../../componets/Alert';
import styles from '../../componets/ContactForm/ContactForm.module.css';
import { CSSTransition } from 'react-transition-group';
import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
import { useAuth } from '../../hooks';
import { NavLink } from 'react-router-dom';
import paths from '../../paths';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();

  /* old reducer 
  const errorAuth = useSelector(getAuthError);
  const isLoadingAuth = useSelector(getAuthLoading);
  */
  const { isRegisterIn, isLoggedIn, error: errorAuth } = useAuth();

  const handleChange = useCallback(e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

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

  const alertReset = () => {
    setAlertError(false);
    setNotification(null);
  };

  const resetInput = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAlertError(false);
    setNotification(null);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const alertNotifocation = notification => {
      setAlertError(true);
      setNotification(notification);

      setTimeout(alertReset, 2500);
    };

    if (name === '') {
      alertNotifocation('Please enter your name');
      return;
    }
    if (email === '') {
      alertNotifocation('Please enter your e-mail');
      return;
    }
    if (password === '') {
      alertNotifocation('Please enter your password');
      return;
    }

    dispatch(register({ name: name, email: email, password: password }));
    resetInput();
  };

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={250}
        classNames="fade-scale"
        unmountOnExit
      >
        {isRegisterIn ? (
          <h2>
            You registered. Now, you need to move :
            <NavLink
              exact
              to={paths.login}
              className="navLinkRegisterPage"
              activeClassName="navLinkActive"
            >
              Login
            </NavLink>
          </h2>
        ) : (
          <>
            <div>
              <h2>Create account</h2>

              <form onSubmit={handleSubmit} className={styles.TaskEditor}>
                <label className={styles.TaskEditor_label}>
                  Name
                  <input
                    className={styles.TaskEditor_input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </label>

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
                  Sing Up
                </button>
              </form>
            </div>
          </>
        )}
      </CSSTransition>

      {isLoggedIn && <LinearIndeterminate />}
      <Alert text={alertError} alert={notification} />
      {errorAuth && <Alert text={true} alert={errorAuth} />}
    </>
  );
}
