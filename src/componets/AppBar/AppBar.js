import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './AppBar.css';
import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import { getIsAuthenticated } from '../../redux/auth-old';

export default function AppBar() {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <header className="appBar">
      <Navigation />

      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames="anime"
        unmountOnExit
      >
        <h1 className="title">Phonebook</h1>
      </CSSTransition>
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
