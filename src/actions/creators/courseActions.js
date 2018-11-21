import toastr from 'toastr';

import * as types from '../constants/actionTypes';
import coursesApi from '../../api/mockCourseApi';
import { fetchLoader, saveLoader } from './ajaxCallLoader';

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

const deleteCourseSuccess = courseId => (
  {
    type: types.DELETE_COURSE_SUCCESS,
    courseId
  }
);

export const loadCourses = () => (
  (dispatch) => {
    dispatch(fetchLoader(true));
    return coursesApi.getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
        dispatch(fetchLoader(false));
      })
      .catch((error) => {
        dispatch(fetchLoader(false));
        throw (error);
      });
  }
);

export const loadSingleCourse = courseId => (
  (dispatch) => {
    dispatch(fetchLoader(true));
    return coursesApi.getSingleCourse(courseId)
      .then((course) => {
        dispatch(loadSingleCourseSuccess(course));
        dispatch(fetchLoader(false));
      })
      .catch((error) => {
        dispatch(fetchLoader(false));
        throw (error);
      });
  }
);

export const saveCourse = course => (
  (dispatch) => {
    dispatch(saveLoader(true));
    return coursesApi.saveCourse(course)
      .then((savedCourse) => {
        if (course.id) {
          dispatch(updateCourseSuccess(savedCourse));
        } else {
          dispatch(createCourseSuccess(savedCourse));
        }
        dispatch(saveLoader(false));
      })
      .catch((error) => {
        dispatch(saveLoader(false));
        throw (error);
      });
  }
);

export const deleteCourse = courseId => (
  dispatch => (
    coursesApi.deleteCourse(courseId)
      .then(() => {
        dispatch(deleteCourseSuccess(courseId));
        toastr.clear();
        toastr.success('Course deleted successfully');
      })
      .catch((error) => {
        throw (error);
      })
  )
);

export const pageChange = page => (
  dispatch => dispatch({
    type: types.COURSES_PAGE_CHANGE,
    page
  })
);
