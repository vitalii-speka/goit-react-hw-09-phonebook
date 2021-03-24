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
        {routes.map(({ component: Component, ...route }) =>
          route.private ? (
            <PrivateRoute key={route.name} {...route}>
              <Component />
            </PrivateRoute>
          ) : (
            <PublicRoute key={route.name} {...route}>
              <Component />
            </PublicRoute>
          ),
        )}
        <Redirect to={paths.home} />
      </Switch>
    </Suspense>
  );
}
