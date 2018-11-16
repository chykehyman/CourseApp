import * as types from '../constants/actionTypes';


const ajaxCallLoader = boolValue => ({
  type: types.ACTION_IN_PROGRESS,
  boolValue
});

export default ajaxCallLoader;
