import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
/*  
import {
  getIsAuthenticated,
  getUserName,
  getIsToken,
} from '../../redux/auth-old';
*/
import { useAuth } from '../../hooks';

import './HomePage.css';

import homePageImage from './home-page.png';

export default function HomePage() {
  // const isAuthenticated = useSelector(getIsAuthenticated);
  // const name = useSelector(getUserName);
  // const isTokenAuth = useSelector(getIsToken);

  const { isLoggedIn, user } = useAuth();
  // console.log('🚀 ~ HomePage ~ user:', user);
  // console.log('🚀 ~ LoginPage ~ isLoggedIn:', isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      document.title = `Hi, ${user.name}`;
    }

    if (!isLoggedIn) {
      return () => {
        document.title = `Phonebook`;
      };
    }
  }, [isLoggedIn, user.name]);

  /* const isAuth = useSelector(state => {
    return state.auth.token;
  });
  */
  
  return (
    <>
      {isLoggedIn ? (
        <h2 className="homePageTitle">
          Hello, {user.name}! This your phonebook
        </h2>
      ) : null}
      {/* {isAuth ? <h2>It's, isAuth {isAuth}! </h2> : null} */}
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
