import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getUserName, logOut } from '../../redux/auth';

import './UserMenu.css';

import defaultAvatar from './default-user.png';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);

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
