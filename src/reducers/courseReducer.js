import * as type from '../actions/constants/actionTypes';
import initialState from '../store/initialState';

export default (state = initialState.coursesState, action) => {
  switch (action.type) {
    case type.FETCH_IN_PROGRESS:
      return { ...state, isFetching: action.boolValue };
    case type.SAVE_IN_PROGRESS:
      return { ...state, isSaving: action.boolValue };
    case type.LOAD_COURSES_SUCCESS:
      return { ...state, allCourses: action.courses };
    case type.LOAD_SINGLE_COURSE_SUCCESS:
      return { ...state, selectedCourse: action.course };
    case type.CREATE_COURSE_SUCCESS:
      return { ...state, allCourses: [...state.allCourses, action.course] };
    case type.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        allCourses: [
          ...state.allCourses.filter(course => course.id !== action.course.id),
          action.course
        ]
      };
    case type.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        allCourses: [...state.allCourses.filter(course => course.id !== action.courseId)]
      };
    case type.COURSES_PAGE_CHANGE:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};
