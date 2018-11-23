import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  pageTitle: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  redirectFunc: PropTypes.func.isRequired
};

const TopSection = ({ pageTitle, buttonLabel, redirectFunc }) => (
  <div className="top-container">
    <h2>{pageTitle}</h2>
    <button
      type="button"
      className="btn btn-outline-primary add-course-button btn-sm"
      onClick={redirectFunc}>
      {buttonLabel}
    </button>
  </div>
);

TopSection.propTypes = propTypes;

export default TopSection;
