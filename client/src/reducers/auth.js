import { SET_CURRENT_USER, SET_USER_PENDING } from '../constants/types';
const isEmpty = require('is-empty');
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
