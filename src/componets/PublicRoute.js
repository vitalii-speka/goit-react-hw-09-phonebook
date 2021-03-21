import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../redux/auth';
import paths from '../paths';

export default function PublicRoute({ component: Component, ...routeProps }) {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated && routeProps.restricted ? (
          <Redirect to={paths.contacts} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
