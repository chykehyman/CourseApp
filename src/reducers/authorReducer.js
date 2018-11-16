import * as type from '../actions/constants/actionTypes';
import initialState from '../store/initialState';

export default (state = initialState.authorsState, action) => {
  switch (action.type) {
    case type.LOAD_AUTHORS_SUCCESS:
      return { ...state, allAuthors: action.authors };
    default:
      return state;
  }
};
