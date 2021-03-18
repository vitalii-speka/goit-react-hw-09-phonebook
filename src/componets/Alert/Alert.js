import { connect } from 'react-redux';
import '../../style/App.css';
import { CSSTransition } from 'react-transition-group';
import { clearError } from '../../redux/auth';
import AlertDismissibleExample from '../../componets/AlertDismissibleExample';

import React, { Component } from 'react';

export class Alert extends Component {
  componentDidMount() {
    if (this.props.alert) {
      setTimeout(() => {
        this.props.clearError();
      }, 5000);
      return;
    }
  }

  render() {
    const { text } = this.props;

    return (
      <CSSTransition
        in={text}
        timeout={250}
        classNames="fade-scale"
        unmountOnExit
      >
        <AlertDismissibleExample text={text} />
      </CSSTransition>
    );
  }
}

const mapDispatchToProps = {
  clearError: clearError,
};

export default connect(null, mapDispatchToProps)(Alert);
