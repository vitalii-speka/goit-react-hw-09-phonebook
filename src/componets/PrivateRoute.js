import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getIsAuthenticated } from '../redux/auth-old';
import paths from '../paths';
import { useAuth } from '../hooks';

export default function PrivateRoute({ children, ...routeProps }) {
  // const isAuthenticated = useSelector(getIsAuthenticated);
  const { isRegisterIn, isLoggedIn } = useAuth();
  // console.log('🚀 ~ PrivateRoute ~ isLoggedIn:', isLoggedIn);
  console.log('🚀 12 ~ PrivateRoute ~ isRegisterIn:', isRegisterIn);

  return (
    <Route {...routeProps}>
      {isRegisterIn && <Redirect to={paths.login} />}
      {isLoggedIn && isRegisterIn ? children : <Redirect to={paths.login} />}
      {/* {isLoggedIn ? children : <Redirect to={paths.login} />} */}
    </Route>
  );
}
