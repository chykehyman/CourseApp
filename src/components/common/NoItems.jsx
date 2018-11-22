import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  displayText: PropTypes.string.isRequired
};

const NoItems = ({ displayText }) => (
  <div className="no-items">
    <i className="fa fa-exclamation-triangle fa-3x pb-3 d-block" />
    <p className="lead">{displayText}</p>
  </div>
);

NoItems.propTypes = propTypes;

export default NoItems;
