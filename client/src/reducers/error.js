import { GET_ERRORS } from '../constants/types';
const initialState = {};
const getErrors = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.err;
    default:
      return state;
  }
};

export default getErrors;
