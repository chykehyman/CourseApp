import * as type from '../actions/constants/actionTypes';
import initialState from '../store/initialState';

export default (state = initialState.authorsState, action) => {
  switch (action.type) {
    case type.FETCH_IN_PROGRESS:
      return { ...state, isFetching: action.boolValue };
    case type.SAVE_IN_PROGRESS:
      return { ...state, isSaving: action.boolValue };
    case type.LOAD_AUTHORS_SUCCESS:
      return { ...state, allAuthors: action.authors };
    case type.LOAD_SINGLE_AUTHOR_SUCCESS:
      return { ...state, selectedAuthor: action.author };
    case type.CREATE_AUTHOR_SUCCESS:
      return { ...state, allAuthors: [...state.allAuthors, action.author] };
    case type.UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        allAuthors: [
          ...state.allAuthors.filter(author => author.id !== action.author.id),
          action.author
        ]
      };
    case type.DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        allAuthors: [...state.allAuthors.filter(author => author.id !== action.authorId)]
      };
    case type.AUTHORS_PAGE_CHANGE:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};
