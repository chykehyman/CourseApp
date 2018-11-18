import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const propTypes = {
  numberOfCoures: PropTypes.number.isRequired
};

const Header = ({ numberOfCoures }) => (
  <nav>
    <Link to="/" className="nav-link" activeclassname="active">Home</Link>
    {' | '}
    <Link to="/courses" className="nav-link" activeclassname="active">
      Courses
      {' '}
      <span className="badge badge-secondary">{numberOfCoures}</span>
    </Link>
    {' | '}
    <Link to="/about" className="nav-link" activeclassname="active">About</Link>
  </nav>
);

const mapStateToProps = ({ courses: { allCourses } }) => ({
  numberOfCoures: allCourses.length
});

Header.propTypes = propTypes;

export default connect(mapStateToProps)(Header);
