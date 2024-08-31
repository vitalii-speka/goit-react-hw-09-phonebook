import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getIsAuthenticated } from '../../redux/auth-old';
import '../AppBar/AppBar.css';
import paths from '../../paths';
import { useAuth } from '../../hooks';

export default function Navigation() {
  // const getIsToken = useSelector(getIsAuthenticated);
    const { isLoggedIn } = useAuth();


  return (
    <nav className="nav">
      <NavLink
        exact
        to={paths.home}
        className="navLink"
        activeClassName="navLinkActive"
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          exact
          to={paths.contacts}
          className="navLink"
          activeClassName="navLinkActive"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
