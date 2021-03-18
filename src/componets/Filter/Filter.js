import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  getFilter,
  getContacts,
  changeFilter,
  clearFilterInput,
} from '../../redux/phonebook';
import BackspaceIcon from '@material-ui/icons/Backspace';
import styles from './Filter.module.css';

class Filter extends Component {
  render() {
    const { value, onChange, contacts, clearInput } = this.props;

    return (
      <>
        <CSSTransition
          in={contacts.length > 0}
          timeout={250}
          classNames="fade"
          unmountOnExit
        >
          <label className={styles.TaskList_item}>
            <p>Find contacts by name</p>
            {/* <div className={styles.position}> */}
            <input
              className={styles.TaskEditor_input}
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              name="filter"
            />
            {value && (
              <button className={styles.button} onClick={() => clearInput()}>
                <BackspaceIcon />
              </button>
            )}

            {/* </div> */}
          </label>
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: getFilter(state),
  contacts: getContacts(state),
});

/* (to)
onChange={onChange}

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(phonebookActions.changeFilter(e.target.value)),
});
(after) */

const mapDispatchToProps = {
  onChange: changeFilter,
  clearInput: clearFilterInput,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
