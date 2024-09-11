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
          className={navData =>
            navData.isActive ? 'navLinkActive' : 'navLink'
          }
        >
          Create Account
        </NavLink>
      )}

      <NavLink
        to={paths.login}
        className={navData => (navData.isActive ? 'navLinkActive' : 'navLink')}
      >
        Log In
      </NavLink>

      {/*  next step => add Google login
      <NavLink
        to={paths.google}
        // to={'http://localhost:8000/api/users/google'}
        className="navLink"
        activeClassName="navLinkActive"
      >
        Continue with Google
      </NavLink> */}
    </nav>
  );
};

export default AuthNav;
