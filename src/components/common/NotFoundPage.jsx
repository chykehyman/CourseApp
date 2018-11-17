import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

const defaultProps = {};


const NotFoundPage = ({ location }) => {
  const message = `Ooops!!!.. Page with route ${location.pathname} was not found`;
  return (
    <div className="bg-faded">
      <div>
        <span>404</span>
        <i className="fa fa-exclamation-triangle fa-3x pb-3 d-block text-warning" />
        {message}
      </div>
    </div>
  );
};

NotFoundPage.propTypes = propTypes;
NotFoundPage.defaultProps = defaultProps;

export default NotFoundPage;
