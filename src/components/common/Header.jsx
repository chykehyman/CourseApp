import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import logo from '../../../public/pluralsight.png';


const propTypes = {
  numberOfCourses: PropTypes.number.isRequired,
  numberOfAuthors: PropTypes.number.isRequired
};

const style = {
  backgroundColor: 'whitesmoke', fontWeight: '600', color: 'rgb(248, 77, 15)'
};

const Header = ({ numberOfCourses, numberOfAuthors }) => (
  <div className="container header-container">
    <NavLink to="/">
      <img src={logo} alt="site_logo" width="150" height="50" />
    </NavLink>
    <nav>
      <NavLink exact to="/" id="home-page" className="nav-link" activeStyle={style}>Home</NavLink>
      <NavLink to="/courses" id="courses-page" className="nav-link" activeStyle={style}>
        Courses
        {' '}
        <span className="badge badge-secondary">{numberOfCourses}</span>
      </NavLink>
      <NavLink to="/authors" id="authors-page" className="nav-link" activeStyle={style}>
        Authors
        {' '}
        <span className="badge badge-secondary">{numberOfAuthors}</span>
      </NavLink>
      <NavLink to="/about" id="about-page" className="nav-link" activeStyle={style}>About</NavLink>
    </nav>
  </div>
);

const mapStateToProps = ({ courses: { allCourses }, authors: { allAuthors } }) => ({
  numberOfCourses: allCourses.length,
  numberOfAuthors: allAuthors.length
});

Header.propTypes = propTypes;

export default connect(mapStateToProps, null, null, { pure: false })(Header);
