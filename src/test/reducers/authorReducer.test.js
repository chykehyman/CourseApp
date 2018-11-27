import authorReducer from '../../reducers/authorReducer';
import * as types from '../../actions/constants/actionTypes';
import initialState from '../../store/initialState';
import mockAuthors from '../__mocks__/authorMock';

describe('author reducer test', () => {
  const { authorsState } = initialState;

  describe('initial state', () => {
    it('should return proper initial state', (done) => {
      expect(authorReducer(undefined, {})).toEqual(authorsState);
      done();
    });
  });

  describe('load authors', () => {
    it('should set fetch loader to true when passed FETCH_IN_PROGRESS',
      (done) => {
        const action = {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        };

        const newState = authorReducer(authorsState, action);
        expect(newState.isFetching).toEqual(true);
        expect(newState.allAuthors).toEqual([]);
        expect(newState.isSaving).toEqual(false);
        expect(newState.selectedAuthor).toEqual({});
        expect(newState.currentPage).toEqual(1);
        done();
      });

    it('should populate allAuthors array when passed LOAD_AUTHORS_SUCCESS',
      (done) => {
        const { authors } = mockAuthors;

        const action = {
          type: types.LOAD_AUTHORS_SUCCESS,
          authors
        };

        const newState = authorReducer(authorsState, action);
        expect(newState.isFetching).toEqual(false);
        expect(newState.allAuthors).toEqual(authors);
        done();
      });
  });

  describe('load single author', () => {
    it('should load a single author when passed LOAD_SINGLE_AUTHOR_SUCCESS', (done) => {
      const { author } = mockAuthors;

      const action = {
        type: types.LOAD_SINGLE_AUTHOR_SUCCESS,
        author
      };

      const newState = authorReducer(authorsState, action);
      expect(newState.isFetching).toEqual(false);
      expect(newState.selectedAuthor).toEqual(author);
      done();
    });
  });

  describe('create and update author', () => {
    it('should set save loader to true when passed SAVE_IN_PROGRESS', (done) => {
      const action = {
        type: types.SAVE_IN_PROGRESS,
        boolValue: true
      };

      const newState = authorReducer(authorsState, action);
      expect(newState.isSaving).toEqual(true);
      done();
    });

    it('should create a new author when passed CREATE_AUTHOR_SUCCESS', (done) => {
      const { newAuthor } = mockAuthors;

      const action = {
        type: types.CREATE_AUTHOR_SUCCESS,
        author: newAuthor
      };

      const newState = authorReducer(authorsState, action);
      expect(newState.isSaving).toEqual(false);
      expect(newState.allAuthors.length).toBe(1);
      expect(newState.allAuthors[0]).toStrictEqual(newAuthor);
      done();
    });

    it('should update an author when passed UPDATE_AUTHOR_SUCCESS', (done) => {
      const { updatedAuthor, authors } = mockAuthors;

      const action = {
        type: types.UPDATE_AUTHOR_SUCCESS,
        author: updatedAuthor
      };

      const newMockAuthorsState = { ...authorsState, allAuthors: authors };
      const newState = authorReducer(newMockAuthorsState, action);
      expect(newState.isSaving).toEqual(false);
      expect(newState.allAuthors.length).toBe(2);
      done();
    });
  });

  describe('delete author', () => {
    it('should delete an author when passed DELETE_AUTHOR_SUCCESS', (done) => {
      const { authors } = mockAuthors;

      const action = {
        type: types.DELETE_AUTHOR_SUCCESS,
        authorId: authors[0].id
      };

      const newMockState = { ...authorsState, allAuthors: authors };

      const newState = authorReducer(newMockState, action);
      expect(newState.allAuthors.length).toBe(1);
      done();
    });
  });

  describe('page change', () => {
    it('should set current page when passed AUTHORS_PAGE_CHANGE', () => {
      const action = {
        type: types.AUTHORS_PAGE_CHANGE,
        page: 2
      };

      const newState = authorReducer(authorsState, action);
      expect(newState.currentPage).toBe(2);
    });
  });
});
