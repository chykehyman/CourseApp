import toast from '../../helpers/toast';
import * as types from '../constants/actionTypes';
import authorApi from '../../api/mockAuthorApi';
import { fetchLoader, saveLoader } from './common';

export { pageChange } from './common';

const loadAuthorsSuccess = authors => (
  {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  }
);

const loadSingleAuthorSuccess = author => (
  {
    type: types.LOAD_SINGLE_AUTHOR_SUCCESS,
    author
  }
);

const createAuthorSuccess = author => (
  {
    type: types.CREATE_AUTHOR_SUCCESS,
    author
  }
);

const updateAuthorSuccess = author => (
  {
    type: types.UPDATE_AUTHOR_SUCCESS,
    author
  }
);

const deleteAuthorSuccess = authorId => (
  {
    type: types.DELETE_AUTHOR_SUCCESS,
    authorId
  }
);

export const loadAuthors = () => (
  (dispatch) => {
    dispatch(fetchLoader(true));
    return authorApi.getAllAuthors()
      .then((courses) => {
        dispatch(loadAuthorsSuccess(courses));
        dispatch(fetchLoader(false));
      })
      .catch((error) => {
        dispatch(fetchLoader(false));
      });
  }
);

export const loadSingleAuthor = authorId => (
  (dispatch) => {
    dispatch(fetchLoader(true));
    return authorApi.getSingleAuthor(authorId)
      .then((author) => {
        dispatch(loadSingleAuthorSuccess(author));
        dispatch(fetchLoader(false));
      })
      .catch((error) => {
        dispatch(fetchLoader(false));
      });
  }
);

export const saveAuthor = author => (
  (dispatch) => {
    dispatch(saveLoader(true));
    return authorApi.saveAuthor(author)
      .then((savedAuthor) => {
        if (author.id) {
          toast.success('Author updated successfully');
          dispatch(updateAuthorSuccess(savedAuthor));
        } else {
          toast.success('Author added successfully');
          dispatch(createAuthorSuccess(savedAuthor));
        }
        dispatch(saveLoader(false));
      })
      .catch((error) => {
        dispatch(saveLoader(false));
      });
  }
);

export const deleteAuthor = authorId => (
  (dispatch, getState) => {
    const { courses: { allCourses } } = getState();
    return authorApi.deleteAuthor(authorId, allCourses)
      .then(() => {
        dispatch(deleteAuthorSuccess(authorId));
        toast.success('Author deleted successfully');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
);
