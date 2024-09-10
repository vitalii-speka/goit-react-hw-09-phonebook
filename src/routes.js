import { lazy } from 'react';
import paths from './paths';

const routes = [
  {
    name: 'Home',
    path: paths.home,
    

    component: lazy(() =>
      import(
        './views/HomePage/HomePage.js' /* webpackChunkName: "home-view" */
      ),
    ),
    private: false,
    restricted: false,
  },
  {
    name: 'Login',
    path: paths.login,
    component: lazy(() =>
      import(
        './views/LoginPage/LoginPage.js' /* webpackChunkName: "logim-view" */
      ),
    ),
    private: false,
    restricted: true,
  },
  {
    name: 'Register',
    path: paths.register,
    component: lazy(() =>
      import(
        './views/RegisterPage/RegisterPage.js' /* webpackChunkName: "google-view" */
      ),
    ),
    private: false,
    restricted: true,
  },
  {
    name: 'Contacts',
    path: paths.contacts,
    component: lazy(() =>
      import(
        './views/ContactsPage/ContactsPage.js' /* webpackChunkName: "contacts-view" */
      ),
    ),
    private: true,
    restricted: false,
  },
];

export default routes;
