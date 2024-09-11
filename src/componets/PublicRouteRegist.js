import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import paths from '../paths';
import { useAuth } from '../hooks';

const PublicRouteRegist = ({ children }) => {
  const { isRegisterIn } = useAuth();
  const { state } = useLocation();
  return !isRegisterIn ? (
    children
  ) : (
    <Navigate to={state ? state : paths.login} />
  );
};

export default PublicRouteRegist;

/* 
export default function PublicRoute({ children, ...routeProps }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Route {...routeProps}>
        {isLoggedIn && routeProps.restricted ? (
          <Navigate to={paths.home} />
        ) : (
          children
        )}
      </Route>
    </>
  );
}
*/
