import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

const defaultProps = {
  value: '',
  error: '',
  placeholder: ''
};

const TextInput = ({
  name, label, onChange, onFocus, placeholder, value, error
}) => {
  let wrapperClass = 'field';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className={wrapperClass}>
        <input
          type="text"
          className="form-control"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          autoComplete="off" />
      </div>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
