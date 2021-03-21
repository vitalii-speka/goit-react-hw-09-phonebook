import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterPage.css';
import { getAuthError, register, getAuthLoading } from '../../redux/auth';
import Alert from '../../componets/Alert';
import styles from '../../componets/ContactForm/ContactForm.module.css';
import { CSSTransition } from 'react-transition-group';
import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const errorAuth = useSelector(getAuthError);
  const isLoadingAuth = useSelector(getAuthLoading);

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
      </CSSTransition>
      {isLoadingAuth && <LinearIndeterminate />}

      {errorAuth && <Alert text={errorAuth} alert={errorAuth} />}
    </>
  );
}
