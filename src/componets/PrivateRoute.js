import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../redux/auth';
import paths from '../paths';

export default function PrivateRoute({ component: Component, ...routeProps }) {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={paths.login} />
        )
      }
    />
  );
}
