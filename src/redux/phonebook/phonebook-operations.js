import axios from 'axios';
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

export const fetchContact = () => async dispatch => {
  dispatch(fetchContactRequest());

  try {
    const { data } = await axios.get(`/contacts`);

    console.log('🚀 ~ fetchContact ~ data.contacts:', data.contacts);
    dispatch(fetchContactSucces(data.contacts));
  } catch (error) {
    dispatch(fetchContactError(error.message));
  }
};

export const addContact = ({ name, number }) => async dispatch => {
  const contacts = {
    name,
    number,
    // completed: false,
  };

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contacts);

    dispatch(addContactSucces(data));
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

/* 
export const removeContact = id => dispatch => {
  dispatch(removeContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch(removeContactSucces(id));
    })
    .catch(error => dispatch(removeContactError(error.message)));
};
*/

export const removeContact = id => async dispatch => {
  dispatch(removeContactRequest());

  try {
    await axios.delete(`/contacts/${id}`);

    dispatch(removeContactSucces(id));
  } catch (error) {
    dispatch(removeContactError(error.message));
  }
};
