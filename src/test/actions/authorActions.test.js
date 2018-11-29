/* eslint-disable */
import * as types from '../../actions/constants/actionTypes';
import * as actions from '../../actions/creators/authorActions';
import { authors } from '../../api/mockAuthorApi';
import { courses } from '../../api/mockCourseApi';


describe('author actions', () => {
  describe('load authors action', () => {
    it('should load all author with appropriate action creators', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        },
        {
          type: types.LOAD_AUTHORS_SUCCESS,
          authors
        },
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: false
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.loadAuthors())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('save and update author actions', () => {
    it('should create a new author with appropriate action creators',
      (done) => {
        const newAuthor = {
          firstName: 'Chike',
          lastName: 'Hygi'
        };
        const expectedActions = [
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: true
          },
          {
            type: types.CREATE_AUTHOR_SUCCESS,
            author: { ...newAuthor, id: 'chike-hygi' }
          },
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: false
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.saveAuthor(newAuthor))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should not create a new author having invalid data, with appropriate action creators',
      () => {
        const newAuthor = {
          firstName: 'C',
          lastName: 'Hygi'
        };
        const expectedActions = [
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: true
          },
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: false
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.saveAuthor(newAuthor))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

    it('should update an author with appropriate action creators',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: true
          },
          {
            type: types.UPDATE_AUTHOR_SUCCESS,
            author: authors[0]
          },
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: false
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.saveAuthor(authors[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('single author action', () => {
    it('should load a single author with appropriate action creators', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        },
        {
          type: types.LOAD_SINGLE_AUTHOR_SUCCESS,
          author: authors[0]
        },
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: false
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.loadSingleAuthor(authors[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should not load a non existing author with appropriate action creators', () => {
      const expectedActions = [
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        },
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: false
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.loadSingleAuthor('fake-author-id'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('delete author action', () => {
    it('should delete an author having no course(s) with appropriate action creators', (done) => {
      const expectedActions = [
        {
          type: types.DELETE_AUTHOR_SUCCESS,
          authorId: authors[1].id
        }
      ];

      const store = storeMock({
        courses: {
          allCourses: courses
        }
      });

      store.dispatch(actions.deleteAuthor(authors[1].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should not delete an author having course(s)', (done) => {
      const expectedActions = [];

      const store = storeMock({
        courses: {
          allCourses: courses
        }
      });

      store.dispatch(actions.deleteAuthor(authors[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('authors page change action', () => {
    it('creates a AUTHORS_PAGE_CHANGE action when user changes page',
      (done) => {
        const expectedActions = [
          {
            type: types.AUTHORS_PAGE_CHANGE,
            page: 1
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.pageChange(1, types.AUTHORS_PAGE_CHANGE));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
