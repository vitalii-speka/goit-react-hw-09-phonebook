import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getIsAuthenticated, getUserName } from '../../redux/auth';

import './HomePage.css';

import homePageImage from './home-page.png';

export class HomePage extends Component {
  state = {};

  render() {
    const { name, isAuthenticated } = this.props;
    return (
      <>
        {isAuthenticated ? (
          <h2 className="homePageTitle">Hello, {name}! This you phonebook</h2>
        ) : null}
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="anime"
          unmountOnExit
        >
          <img
            src={homePageImage}
            alt=""
            width="640"
            className="homePageImage"
          />
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  name: getUserName(state),
});

export default connect(mapStateToProps, null)(HomePage);
