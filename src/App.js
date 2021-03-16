import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from './componets/AppBar';
import Container from './componets/Container';
import { getCurrentUser } from './redux/auth';
import './componets/App.css';
import Content from './Content';

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <AppBar />
          <Content />
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
