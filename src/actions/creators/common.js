import * as types from '../constants/actionTypes';


export const fetchLoader = boolValue => ({
  type: types.FETCH_IN_PROGRESS,
  boolValue
});

export const saveLoader = boolValue => ({
  type: types.SAVE_IN_PROGRESS,
  boolValue
});

export const pageChange = (page, type) => (
  dispatch => dispatch({
    type,
    page
  })
);
