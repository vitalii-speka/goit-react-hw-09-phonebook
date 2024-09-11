import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { logOut, instance } from '../../redux/auth/operations';

import './UserMenu.css';

import defaultAvatar from './default-user.png';
import { useAuth } from '../../hooks';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { token, user } = useAuth();

  const onLogOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  /*  token from useEffect + localStorage
 

  if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + localStorage.getItem('token');
  }
 */

  return (
    <div className="container-user">
      <img src={defaultAvatar} alt="" width="32" className="avatar" />
      {user && <span className="name">Welcome, {user.name}</span>}
      <Button variant="outline-info" onClick={onLogOut}>
        Logout
      </Button>
    </div>
  );
}
