import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_PROFILE,
  LOGOUT,
} from './types';

import setAuthToken from 'utils/setAuthToken';

import { setAlert } from './alert';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//login user

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert('Login Success', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//register

export const register = ({ name, email, password }) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert('Successfully Registered', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Logout / clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
