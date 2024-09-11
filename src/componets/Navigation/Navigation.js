import React from 'react';
import { NavLink } from 'react-router-dom';
import '../AppBar/AppBar.css';
import paths from '../../paths';
import { useAuth } from '../../hooks';

export default function Navigation() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="nav">
      <NavLink
        to={paths.home}
        className={navData => (navData.isActive ? 'navLinkActive' : 'navLink')}
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to={paths.contacts}
          className={navData =>
            navData.isActive ? 'navLinkActive' : 'navLink'
          }
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
