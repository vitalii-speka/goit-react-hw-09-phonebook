import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getUserName, getIsToken } from '../../redux/auth';

import './HomePage.css';

import homePageImage from './home-page.png';

export default function HomePage() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const name = useSelector(getUserName);
  const isTokenAuth = useSelector(getIsToken);

  useEffect(() => {
    if (isTokenAuth) {
      document.title = `Hi, ${name}`;
    }

    if (!isTokenAuth) {
      return () => {
        document.title = `Phonebook`;
      };
    }
  }, [isTokenAuth, name]);

  return (
    <>
      {isAuthenticated ? (
        <h2 className="homePageTitle">Hello, {name}! This your phonebook</h2>
      ) : null}
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="anime"
        unmountOnExit
      >
        <img src={homePageImage} alt="" width="480" className="homePageImage" />
      </CSSTransition>
    </>
  );
}
