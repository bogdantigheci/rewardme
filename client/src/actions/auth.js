import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_USER_PENDING,
  REGISTER_USER_PENDING,
} from '../constants/types';

export const getErrors = (err) => ({
  type: GET_ERRORS,
  err,
});

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserPending = () => {
  return {
    type: SET_USER_PENDING,
  };
};

export const registerUserPending = () => {
  return {
    type: REGISTER_USER_PENDING,
  };
};

export const registerUser = (userData, history) => (dispatch) => {
  dispatch(registerUserPending());
  axios
    .post('http://localhost:3002/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) => dispatch(dispatch(getErrors(err.response.data))));
};
export const loginUser = (userData) => (dispatch) => {
  dispatch(setUserPending());
  axios
    .post('http://localhost:3002/api/users/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => dispatch(getErrors(err.response.data)));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
