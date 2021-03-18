import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth';
import '../AppBar/AppBar.css';
import paths from '../../paths';

const Navigation = ({ getIsToken }) => {
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
};

const mapDispatchToProps = state => ({
  getIsToken: getIsAuthenticated(state),
});

export default connect(mapDispatchToProps)(Navigation);
