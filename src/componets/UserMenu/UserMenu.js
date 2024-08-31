import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getUserName } from '../../redux/auth-old';
import { logOut, setAuthHeader } from '../../redux/auth/operations';
import { useAuth } from '../../hooks';

import './UserMenu.css';

import defaultAvatar from './default-user.png';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  // if (localStorage.getItem('token')) {
  //   axios.defaults.headers.common['Authorization'] =
  //     'Token ' + localStorage.getItem('token');
  // }

  const onLogOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <div className="container-user">
      <img src={defaultAvatar} alt="" width="32" className="avatar" />
      <span className="name">Welcome, {name}</span>
      <Button variant="outline-info" onClick={onLogOut}>
        Logout
      </Button>
    </div>
  );
}
