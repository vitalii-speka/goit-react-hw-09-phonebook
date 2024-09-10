import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import paths from '../paths';
import { useAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
 const { token } = useAuth();
  const location = useLocation();
  return token ? children : <Navigate to={paths.login} state={location} />;
};

export default PrivateRoute;

/* 
export default function PrivateRoute({ children, ...routeProps }) {
  const { isLoggedIn } = useAuth();

  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Navigate to={paths.login} />}
    </Route>
  );
}
*/