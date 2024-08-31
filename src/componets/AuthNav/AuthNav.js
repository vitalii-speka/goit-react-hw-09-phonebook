import React from 'react';
import { NavLink } from 'react-router-dom';
import '../AppBar/AppBar.css';
import paths from '../../paths';
import { useAuth } from '../../hooks';

const AuthNav = () => {
  const { isRegisterIn } = useAuth();

  return (
    <nav className="nav">
      {!isRegisterIn && (
        <NavLink
          to={paths.register}
          className="navLink"
          activeClassName="navLinkActive"
        >
          Create Account
        </NavLink>
      )}

      <NavLink
        to={paths.login}
        className="navLink"
        activeClassName="navLinkActive"
      >
        Log In
      </NavLink>
    </nav>
  );
};

export default AuthNav;
