import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import paths from '../paths';
import { useAuth } from '../hooks';

export default function PublicRoute({ children, ...routeProps }) {
  const { isLoggedIn } = useAuth();


  return (
    <Route {...routeProps}>
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={paths.home} />
      ) : (
        children
      )}
    </Route>
  );
}
