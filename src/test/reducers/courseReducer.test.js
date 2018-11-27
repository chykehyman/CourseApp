import courseReducer from '../../reducers/courseReducer';
import * as types from '../../actions/constants/actionTypes';
import initialState from '../../store/initialState';
import mockCourses from '../__mocks__/courseMock';

describe('course reducer test', () => {
  const { coursesState } = initialState;

  describe('initial state', () => {
    it('should return apppropiate initial state', (done) => {
      expect(courseReducer(undefined, {})).toEqual(coursesState);
      done();
    });
  });

  describe('load courses', () => {
    it('should set fetch loader to true when passed FETCH_IN_PROGRESS',
      (done) => {
        const action = {
          type: types.FETCH_IN_PROGRESS,
          boolValue: true
        };

        const newState = courseReducer(coursesState, action);
        expect(newState.isFetching).toEqual(true);
        expect(newState.allCourses).toEqual([]);
        expect(newState.isSaving).toEqual(false);
        expect(newState.selectedCourse).toEqual({});
        expect(newState.currentPage).toEqual(1);
        done();
      });

    it('should populate allCourses array when passed LOAD_COURSES_SUCCESS',
      (done) => {
        const { courses } = mockCourses;

        const action = {
          type: types.LOAD_COURSES_SUCCESS,
          courses
        };

        const newState = courseReducer(coursesState, action);
        expect(newState.isFetching).toEqual(false);
        expect(newState.allCourses).toEqual(courses);
        done();
      });
  });

  describe('load single course', () => {
    it('should load a single course when passed LOAD_SINGLE_COURSE_SUCCESS', (done) => {
      const { existingCourse } = mockCourses;

      const action = {
        type: types.LOAD_SINGLE_COURSE_SUCCESS,
        course: existingCourse
      };

      const newState = courseReducer(coursesState, action);
      expect(newState.isFetching).toEqual(false);
      expect(newState.selectedCourse).toEqual(existingCourse);
      done();
    });
  });

  describe('create and update course', () => {
    it('should set save loader to true when passed SAVE_IN_PROGRESS', (done) => {
      const action = {
        type: types.SAVE_IN_PROGRESS,
        boolValue: true
      };

      const newState = courseReducer(coursesState, action);
      expect(newState.isSaving).toEqual(true);
      done();
    });

    it('should create a new course when passed CREATE_COURSE_SUCCESS', (done) => {
      const { courses } = mockCourses;

      const action = {
        type: types.CREATE_COURSE_SUCCESS,
        course: courses[0]
      };

      const newState = courseReducer(coursesState, action);
      expect(newState.isSaving).toEqual(false);
      expect(newState.allCourses.length).toBe(1);
      expect(newState.allCourses[0]).toStrictEqual(courses[0]);
      done();
    });

    it('should update a course when passed UPDATE_COURSE_SUCCESS', (done) => {
      const { updatedCourse, courses } = mockCourses;

      const action = {
        type: types.UPDATE_COURSE_SUCCESS,
        course: updatedCourse
      };

      const newMockCoursesState = { ...coursesState, allCourses: courses };
      const newState = courseReducer(newMockCoursesState, action);
      expect(newState.isSaving).toEqual(false);
      expect(newState.allCourses.length).toBe(2);
      done();
    });
  });

  describe('delete course', () => {
    it('should delete a course when passed DELETE_COURSE_SUCCESS', (done) => {
      const { courses } = mockCourses;

      const action = {
        type: types.DELETE_COURSE_SUCCESS,
        courseId: courses[0].id
      };

      const newMockState = { ...coursesState, allCourses: courses };

      const newState = courseReducer(newMockState, action);
      expect(newState.allCourses.length).toBe(1);
      done();
    });
  });

  describe('page change', () => {
    it('should set current page when passed COURSES_PAGE_CHANGE', () => {
      const action = {
        type: types.COURSES_PAGE_CHANGE,
        page: 2
      };

      const newState = courseReducer(coursesState, action);
      expect(newState.currentPage).toBe(2);
    });
  });
});
