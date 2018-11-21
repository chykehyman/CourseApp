import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
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
  name, label, onChange, onFocus, defaultOption, value, error, options
}) => {
  let wrapperClass = 'custom-select';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }
  return (
    <div className="form-group">
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <select
        className={wrapperClass}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}>
          <option value="">{defaultOption}</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {`${option.firstName} ${option.lastName}`}
            </option>
          ))}
        </select>
        {error && <div className="field-error">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default SelectInput;
