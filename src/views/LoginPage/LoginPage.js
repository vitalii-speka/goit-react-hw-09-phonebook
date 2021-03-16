import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../componets/ContactForm/ContactForm.module.css';
import {
  logIn,
  getAuthError,
  getAuthLoading,
  getUserName,
} from '../../redux/auth';
import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';
import { CSSTransition } from 'react-transition-group';

import Alert from '../../componets/Alert';

export class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onLogin(this.state);

    this.setState({ email: '', password: '' });
  };

  // componentDidMount() {
  //   if (this.props.isLoadingAuth) {
  //     document.title = `helo ${this.props.email}`;
  //   }
  // }

  render() {
    const { email, password } = this.state;
    const { errorAuth, isLoadingAuth } = this.props;

    return (
      <>
        {/* {isLoadingAuth && <LinearIndeterminate />} */}

        {isLoadingAuth ? (
          <LinearIndeterminate />
        ) : (
          <CSSTransition
            in={true}
            appear={true}
            timeout={250}
            classNames="fade-scale"
            unmountOnExit
          >
            <div>
              <h2>Enter Login and Password</h2>
              <form onSubmit={this.handleSubmit} className={styles.TaskEditor}>
                <label className={styles.TaskEditor_label}>
                  Email
                  <input
                    className={styles.TaskEditor_input}
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </label>

                <label className={styles.TaskEditor_label}>
                  Password
                  <input
                    className={styles.TaskEditor_input}
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </label>

                <button className={styles.TaskEditor_button} type="submit">
                  Log In
                </button>
              </form>
            </div>
          </CSSTransition>
        )}
        {errorAuth && <Alert text={errorAuth} alert={errorAuth} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  errorAuth: getAuthError(state),
  isLoadingAuth: getAuthLoading(state),
  name: getUserName(state),
});

const mapDispatchToProps = {
  onLogin: logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

/* вариант 2
import { logIn } from '../../redux/auth/auth-operations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginPage = () => (

  <>
    <h2>Enter Login and Password</h2>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  </>
);

export default LoginPage;
*/
