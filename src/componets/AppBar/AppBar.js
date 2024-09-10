import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './AppBar.css';
import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import { useAuth } from '../../hooks';

export default function AppBar() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="appBar">
      <Navigation />
      <CSSTransition
        // nodeRef={nodeRef}
        in={true}
        appear={true}
        timeout={300}
        classNames="anime"
        unmountOnExit
      >
        <h1 className="title">Phonebook</h1>
      </CSSTransition>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
