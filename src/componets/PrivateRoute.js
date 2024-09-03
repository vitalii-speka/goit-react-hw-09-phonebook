import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import paths from '../paths';
import { useAuth } from '../hooks';

export default function PrivateRoute({ children, ...routeProps }) {
  const { isLoggedIn } = useAuth();

  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={paths.login} />}
    </Route>
  );
}
