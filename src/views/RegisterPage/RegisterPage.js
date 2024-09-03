import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterPage.css';
import '../../componets/AppBar/AppBar.css';
import { getAuthError, getAuthLoading } from '../../redux/auth-old';
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
  const [errorState, seterrorState] = useState('');

  const dispatch = useDispatch();

  /* old reducer 
  const errorAuth = useSelector(getAuthError);
  const isLoadingAuth = useSelector(getAuthLoading);
  */
  const { isRegisterIn, isLoggedIn, error } = useAuth();
  console.log('🚀 27 ~ RegisterPage ~ isLoggedIn:', isLoggedIn);
  console.log('🚀 28 ~ RegisterPage ~ error:', error);
  // console.log('🚀 ~ RegisterPage ~ isRegisterIn:', isRegisterIn);

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

  const handleSubmit = e => {
    e.preventDefault();

    if (name === '') {
      seterrorState(`field 'Name' couldn't be empry`);
      return;
    }
    if (email === '') {
      seterrorState(`field 'Email' couldn't be empry`);
      return;
    }
    if (password === '') {
      seterrorState(`field 'Password' couldn't be empry`);
      return;
    }

    dispatch(register({ name: name, email: email, password: password }));

    setName('');
    setEmail('');
    setPassword('');
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
            Now you could move to:
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
      {errorState && <Alert text={true} alert={errorState} />}
      {error && <Alert text={true} alert={error} />}
    </>
  );
}
