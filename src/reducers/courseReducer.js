import * as type from '../actions/constants/actionTypes';
import initialState from '../store/initialState';

export default (state = initialState.coursesState, action) => {
  switch (action.type) {
    case type.ACTION_IN_PROGRESS:
      return { ...state, isLoading: action.boolValue };
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
    default:
      return state;
  }
};
