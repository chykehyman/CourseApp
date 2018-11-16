import * as types from '../constants/actionTypes';
import coursesApi from '../../api/mockCourseApi';
import ajaxCallLoader from './ajaxCallLoader';

const loadCoursesSuccess = courses => (
  {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  }
);

const loadSingleCourseSuccess = course => (
  {
    type: types.LOAD_SINGLE_COURSE_SUCCESS,
    course
  }
);

const createCourseSuccess = course => (
  {
    type: types.CREATE_COURSE_SUCCESS,
    course
  }
);

const updateCourseSuccess = course => (
  {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  }
);

export const loadCourses = () => (
  (dispatch) => {
    dispatch(ajaxCallLoader(true));
    return coursesApi.getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
        dispatch(ajaxCallLoader(false));
      })
      .catch((error) => {
        dispatch(ajaxCallLoader(false));
        throw (error);
      });
  }
);

export const loadSingleCourse = courseId => (
  (dispatch) => {
    dispatch(ajaxCallLoader(true));
    return coursesApi.getSingleCourse(courseId)
      .then((course) => {
        dispatch(loadSingleCourseSuccess(course));
        dispatch(ajaxCallLoader(false));
      })
      .catch((error) => {
        dispatch(ajaxCallLoader(false));
        throw (error);
      });
  }
);

export const saveCourse = course => (
  (dispatch) => {
    dispatch(ajaxCallLoader(true));
    return coursesApi.saveCourse(course)
      .then((savedCourse) => {
        if (course.id) {
          dispatch(updateCourseSuccess(savedCourse));
        } else {
          dispatch(createCourseSuccess(savedCourse));
        }
        dispatch(ajaxCallLoader(false));
      })
      .catch((error) => {
        dispatch(ajaxCallLoader(false));
        throw (error);
      });
  }
);
