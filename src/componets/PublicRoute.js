import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getIsAuthenticated } from '../redux/auth-old';
import paths from '../paths';
import { useAuth } from '../hooks';

export default function PublicRoute({ children, ...routeProps }) {
  // const isAuthenticated = useSelector(getIsAuthenticated);
  const { isRegisterIn, isLoggedIn } = useAuth();
  console.log('🚀 11 ~ PublicRoute ~ routeProps:', routeProps);
  console.log('🚀 12 ~ PublicRoute ~ isRegisterIn', isRegisterIn);

  return (
    <Route {...routeProps}>
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={paths.contacts} />
      ) : (
        children
      )}
      {/* {isAuthenticated && routeProps.restricted ? (
        <Redirect to={paths.contacts} />
      ) : (
        children
      )} */}
    </Route>
  );
}
