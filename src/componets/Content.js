import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import LinearIndeterminate from './spiner/LinearIndeterminate';

import routes from '../routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import paths from '../paths';

export default function Content() {
  return (
    <Suspense fallback={<LinearIndeterminate />}>
      <Switch>
        {routes.map(route =>
          route.private ? (
            <PrivateRoute key={route.name} {...route} />
          ) : (
            <PublicRoute key={route.name} {...route} />
          ),
        )}
        <Redirect to={paths.home} />
      </Switch>
    </Suspense>
  );
}

/*
export default function Content() {
  return (
    <Suspense fallback={<LinearIndeterminate />}>
      <Switch>
        {routes.map(route =>
          route.private ? (
            <PrivateRoute key={route.name} {...route}>
              {route.component}
            </PrivateRoute>
          ) : (
            // <PublicRoute {...props}>
            //   <Component />
            // </PublicRoute>
            <PublicRoute key={route.name} {...route}>
              {route.component}
            </PublicRoute>
          ),
        )}
        <Redirect to={paths.home} />
      </Switch>
    </Suspense>
  );
}

*/
