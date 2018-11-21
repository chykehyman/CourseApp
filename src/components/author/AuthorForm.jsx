import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';


const propTypes = {
  author: PropTypes.shape().isRequired,
  handleOnSave: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnFocus: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  errors: PropTypes.shape()
};

const defaultProps = {
  errors: {}
};

const AuthorForm = ({
  author, handleOnSave, handleOnChange, handleOnFocus, isSaving, errors
}) => (
  <form>
    <TextInput
      name="firstName"
      label="First Name"
      value={author.firstName}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      placeholder="eg. John"
      error={errors.firstName} />
    <TextInput
      name="lastName"
      label="Last Name"
      value={author.lastName}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      placeholder="eg. Doe"
      error={errors.lastName} />
    <input
     type="submit"
     className="btn btn-primary"
     disabled={isSaving}
     value={isSaving ? 'Saving...' : 'Save'}
     onClick={handleOnSave} />
  </form>
);
AuthorForm.propTypes = propTypes;
AuthorForm.defaultProps = defaultProps;

export default AuthorForm;
