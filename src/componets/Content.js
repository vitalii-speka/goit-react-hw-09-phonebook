import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LinearIndeterminate from './spiner/LinearIndeterminate';
// import routes from '../routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import PublicRouteRegist from './PublicRouteRegist';
import paths from '../paths';
import { useAuth } from '../hooks/useAuth.js';
import { refreshCurrentUser } from '../redux/auth/operations.js';


const HomePage = lazy(() => import('../views/HomePage/HomePage.js'));
const LoginPage = lazy(() => import('../views/LoginPage/LoginPage.js'));
const RegisterPage = lazy(() =>
  import('../views/RegisterPage/RegisterPage.js'),
);
const ContactsPage = lazy(() =>
  import('../views/ContactsPage/ContactsPage.js'),
);

const Content = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      dispatch(refreshCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={<LinearIndeterminate />}>
      <Routes>
        <Route path={paths.home}>
          <Route index element={<HomePage />} />
          <Route
            path={paths.contacts}
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path={paths.register}
          element={
            <Suspense fallback={<LinearIndeterminate />}>
              <PublicRouteRegist>
                <RegisterPage />
              </PublicRouteRegist>
            </Suspense>
          }
        />
        <Route
          path={paths.login}
          element={
            <Suspense fallback={<LinearIndeterminate />}>
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Content;

/* 
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
        <Navigate to={paths.home} />
*/
