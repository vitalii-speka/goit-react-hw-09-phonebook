import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getUserName } from '../../redux/auth-old';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks';

import './UserMenu.css';

import defaultAvatar from './default-user.png';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);
  const { token } = useAuth();

  

  useEffect(() => {
    const localAuth = localStorage.getItem('auth');
    if (localAuth) {
    
    const data = JSON.parse(localAuth);
    console.log('🚀 22 ~ useEffect ~ localAuth:', data);
  }
  }, []);
  // if (localStorage.getItem('token')) {
  //   axios.defaults.headers.common['Authorization'] =
  //     'Token ' + localStorage.getItem('token');
  // }

  const tokenFromLocalStorage = JSON.parse(localStorage.getItem('auth'));
  console.log('🚀 28 ~ tokenFromLocalStorage:', tokenFromLocalStorage);

  const onLogOut = useCallback(() => {
    // dispatch(logOut({ token: token }));
    dispatch(logOut(`Bearer ${token}`));
  }, [dispatch, token]);

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
