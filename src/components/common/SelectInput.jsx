import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  value: '',
  error: '',
  defaultOption: '',
  options: []
};

const SelectInput = ({
  name, label, onChange, defaultOption, value, error, options
}) => (
  <div className="form-group">
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select
      className="custom-select"
      name={name}
      value={value}
      onChange={onChange}>
        <option value="">{defaultOption}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {`${option.firstName} ${option.lastName}`}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  </div>
);

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default SelectInput;
