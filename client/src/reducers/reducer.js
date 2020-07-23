import { combineReducers } from 'redux';
import error from './error';
import auth from './auth';

const reducer = combineReducers({
  auth,
  error,
});

export default reducer;
