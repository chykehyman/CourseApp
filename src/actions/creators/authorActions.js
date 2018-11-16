import * as types from '../constants/actionTypes';
import authorApi from '../../api/mockAuthorApi';

const loadAuthorsSuccess = authors => (
  {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  }
);

export const loadAuthors = () => (
  dispatch => (
    authorApi.getAllAuthors()
      .then(authors => dispatch(loadAuthorsSuccess(authors)))
      .catch((error) => { throw (error); })
  )
);
