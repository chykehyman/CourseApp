import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/constants/actionTypes';
import * as actions from '../../actions/creators/courseActions';
import { courses, replaceAll } from '../../api/mockCourseApi';
import courseMock from '../__mocks__/courseMock';

const middleware = [thunk];
const storeMock = configureMockStore(middleware);

describe('course actions', () => {
  describe('load courses action', () => {
    it('should load all courses, with appropriate dispatched action creators', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        },
        {
          type: types.LOAD_COURSES_SUCCESS,
          courses
        },
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: false
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.loadCourses())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('save and update author actions', () => {
    it('should create a new course, with appropriate dispatched action creators',
      (done) => {
        const { validNewCourse } = courseMock;
        const id = replaceAll(validNewCourse.title, ' ', '-');
        const expectedActions = [
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: true
          },
          {
            type: types.CREATE_COURSE_SUCCESS,
            course: {
              ...validNewCourse,
              id,
              watchHref: `http://www.pluralsight.com/courses/${id}`
            }
          },
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: false
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.saveCourse(validNewCourse))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should not create a new course having invalid data, with appropriate dispatched action creators',
      () => {
        const { inValidNewCourse } = courseMock;
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

        store.dispatch(actions.saveCourse(inValidNewCourse))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

    it('should update a course, with appropriate dispatched action creators',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: true
          },
          {
            type: types.UPDATE_COURSE_SUCCESS,
            course: courses[0]
          },
          {
            type: types.SAVE_IN_PROGRESS,
            boolValue: false
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.saveCourse(courses[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('single course action', () => {
    it('should load a single course, with appropriate dispatched action creators', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        },
        {
          type: types.LOAD_SINGLE_COURSE_SUCCESS,
          course: courses[0]
        },
        {
          type: types.FETCH_IN_PROGRESS,
          boolValue: false
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.loadSingleCourse(courses[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should not load a non existing course, with appropriate dispatched action creators', () => {
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

      store.dispatch(actions.loadSingleCourse('fake-course-id'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('delete course action', () => {
    it('should delete a course, with appropriate dispatched action creators', (done) => {
      const expectedActions = [
        {
          type: types.DELETE_COURSE_SUCCESS,
          courseId: courses[0].id
        }
      ];

      const store = storeMock({});

      store.dispatch(actions.deleteCourse(courses[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('courses page change action', () => {
    it('creates a COURSES_PAGE_CHANGE action user changes page',
      (done) => {
        const expectedActions = [
          {
            type: types.COURSES_PAGE_CHANGE,
            page: 1
          }
        ];

        const store = storeMock({});

        store.dispatch(actions.pageChange(1, types.COURSES_PAGE_CHANGE));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
