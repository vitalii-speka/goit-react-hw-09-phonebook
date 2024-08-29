import axios from 'axios';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  clearError,
} from './auth-actions';

// axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:8000/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = credentials => async dispatch => {
  dispatch(registerRequest());

  try {
    const { data } = await axios.post('/users/register', credentials, {
    // const { data } = await axios.post('/users/signup', credentials, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    // token.set(data.token);
    dispatch(registerSuccess(data));
    dispatch(clearError());
  } catch (error) {
    console.log('🚀 ~ register ~ error:', error);
    dispatch(registerError(error.message));
  }
};

export const logIn = credentials => async dispatch => {
  dispatch(loginRequest());

  try {
    const { data } = await axios.post('/users/login', credentials);

    token.set(data.token);
    dispatch(loginSuccess(data));
    dispatch(clearError());
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logOut = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.post('/users/logout');

    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
    token.unset();
  }
};

/*  need add new routers

router.patch('/', guard, validationUpdateSub, userController.updateSub)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), userController.updateAvatar)
router.get('/verify/:token', userController.verify)
router.post('/verify', validationUserVerify, userController.repeatEmailVerify)
*/
