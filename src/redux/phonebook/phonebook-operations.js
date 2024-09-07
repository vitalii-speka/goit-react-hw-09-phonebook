import {
  fetchContactRequest,
  fetchContactSucces,
  fetchContactError,
  addContactRequest,
  addContactSucces,
  addContactError,
  removeContactRequest,
  removeContactSucces,
  removeContactError,
} from './phonebook-actions';
import { instance } from '../auth/operations';

export const fetchContact = () => async dispatch => {
  dispatch(fetchContactRequest());

  /* token from localStorage
  if (localStorage.getItem('persist:auth')) {
    const { token } = JSON.parse(localStorage.getItem('persist:auth'));
    console.log('🚀 ~ fetchContact ~ date:', token);
  }
 */

  try {
    const { data } = await instance.get(
      `/contacts`,
      /* params
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      */
    );

    dispatch(fetchContactSucces(data.contacts));
  } catch (error) {
    console.log('🚀 ~ fetchContact ~ error:', error);
    dispatch(fetchContactError(error.message));
  }
};

export const addContact =
  ({ name, number }) =>
  async dispatch => {
    const contacts = {
      name,
      number,
      // completed: false,
    };

    dispatch(addContactRequest());

    try {
      const { data } = await instance.post('/contacts', contacts);

      dispatch(addContactSucces(data));
    } catch (error) {
      dispatch(addContactError(error.message));
    }
  };

export const removeContact = id => async dispatch => {
  dispatch(removeContactRequest());

  try {
    await instance.delete(`/contacts/${id}`);

    dispatch(removeContactSucces(id));
  } catch (error) {
    dispatch(removeContactError(error.message));
  }
};
