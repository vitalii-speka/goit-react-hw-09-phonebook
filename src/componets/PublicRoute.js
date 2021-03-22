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

/* 
export default function PublicRoute({ children: Component, ...routeProps }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  console.log(Component);
  // console.log(...routeProps);
  return (
    <Route {...routeProps}>
      {isAuthenticated && routeProps.restricted ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to={paths.contacts} />
      )}
    </Route>
  );
}

*/
