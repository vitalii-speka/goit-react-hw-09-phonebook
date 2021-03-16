import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { getUserName, logOut } from '../../redux/auth';

import './UserMenu.css';

import defaultAvatar from './default-user.png';

const UserMenu = ({ avatar, name, onLoguout }) => (
  <div className="container-user">
    <img src={avatar} alt="" width="32" className="avatar" />
    <span className="name">Welcome, {name}</span>
    <Button variant="outline-info" onClick={onLoguout}>
      Logout
    </Button>
  </div>
);

const mapStateToProps = state => ({
  avatar: defaultAvatar,
  name: getUserName(state),
});

const mapDispatchToProps = {
  onLoguout: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
