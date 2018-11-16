import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const propTypes = {
  course: PropTypes.shape().isRequired,
  allAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnSave: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.shape()
};

const defaultProps = {
  errors: {}
};

const CourseForm = ({
  course, allAuthors, handleOnSave, handleOnChange, isLoading, errors
}) => (
  <form>
    <TextInput
      name="title"
      label="Title"
      value={course.title}
      onChange={handleOnChange}
      error={errors.title} />
    <SelectInput
      name="authorId"
      label="Author"
      value={course.authorId}
      defaultOption="Select Author"
      options={allAuthors}
      onChange={handleOnChange}
      error={errors.authorId} />
    <TextInput
      name="category"
      label="category"
      value={course.category}
      onChange={handleOnChange}
      error={errors.category} />
    <TextInput
        name="length"
        label="length"
        value={course.length}
        onChange={handleOnChange}
        error={errors.length} />
    <input
     type="submit"
     className="btn btn-primary"
     value={isLoading ? 'Saving' : 'Save'}
     onClick={handleOnSave} />
  </form>
);

CourseForm.propTypes = propTypes;
CourseForm.defaultProps = defaultProps;

export default CourseForm;
