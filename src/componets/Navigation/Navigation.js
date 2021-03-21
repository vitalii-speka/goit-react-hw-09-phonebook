import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth';
import '../AppBar/AppBar.css';
import paths from '../../paths';

export default function Navigation() {
  const getIsToken = useSelector(getIsAuthenticated);

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

      {getIsToken && (
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
