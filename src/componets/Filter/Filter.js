import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  getFilter,
  getContacts,
  changeFilter,
  clearFilterInput,
} from '../../redux/phonebook';
import BackspaceIcon from '@material-ui/icons/Backspace';
import styles from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const value = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const clearInput = useCallback(() => {
    dispatch(clearFilterInput());
  }, [dispatch]);

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
          <input
            className={styles.TaskEditor_input}
            type="text"
            value={value}
            onChange={e => dispatch(changeFilter(e.target.value))}
            name="filter"
          />
          {value && (
            <button className={styles.button} onClick={clearInput}>
              <BackspaceIcon />
            </button>
          )}
        </label>
      </CSSTransition>
    </>
  );
}

/* ...

  const mapStateToProps = state => ({
  value: getFilter(state),
  contacts: getContacts(state),
  });


  const mapDispatchToProps = {
    onChange: changeFilter,
    clearInput: clearFilterInput,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Filter);  
*/
