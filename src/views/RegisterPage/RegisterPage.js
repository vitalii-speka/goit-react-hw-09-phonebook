import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegisterPage.css';
import { getAuthError, register, getAuthLoading } from '../../redux/auth';
import Alert from '../../componets/Alert';
import styles from '../../componets/ContactForm/ContactForm.module.css';
import { CSSTransition } from 'react-transition-group';
import LinearIndeterminate from '../../componets/spiner/LinearIndeterminate';

export class RegisterPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onRegister(this.state);

    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { name, email, password } = this.state;
    const { errorAuth, isLoadingAuth } = this.props;

    return (
      <>
        <CSSTransition
          in={true}
          appear={true}
          timeout={250}
          classNames="fade-scale"
          unmountOnExit
        >
          <div>
            <h2>Create account</h2>

            <form onSubmit={this.handleSubmit} className={styles.TaskEditor}>
              <label className={styles.TaskEditor_label}>
                Name
                <input
                  className={styles.TaskEditor_input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </label>

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
                Sing Up
              </button>
            </form>
          </div>
        </CSSTransition>
        {isLoadingAuth && <LinearIndeterminate />}

        {errorAuth && <Alert text={errorAuth} alert={errorAuth} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  errorAuth: getAuthError(state),
  isLoadingAuth: getAuthLoading(state),
});

const mapDispatchToProps = {
  onRegister: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
