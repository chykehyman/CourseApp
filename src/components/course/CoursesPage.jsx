import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import _ from 'lodash';

import CourseList from './CourseList';
import * as courseActions from '../../actions/creators/courseActions';

const propTypes = {
  courses: PropTypes.shape({
    allCourses: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    loadCourses: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

class CoursesPage extends Component {
 actions = this.props.actions;

 componentDidMount() {
   this.actions.loadCourses();
 }

  showAddCoursePage = () => {
    const { history } = this.props;
    history.push('/course');
  };

  courseRow = (course, index) => (
    <div key={index}>{course.title}</div>
  );

  handleOnCourseDelete = (courseId) => {
    this.actions.deleteCourse(courseId);
  };

  renderCoursesTable = (allCourses) => {
    if (allCourses.length > 0) {
      return <CourseList courses={allCourses} handleDelete={this.handleOnCourseDelete} />;
    }
    return (
      <div>There are no available courses</div>
    );
  }

  render() {
    const { courses: { allCourses, isLoading } } = this.props;
    return (
      <div>
        <div className="top-container">
          <h1>Courses</h1>
          <button
            type="button"
            className="btn btn-outline-primary add-course-button btn-sm"
            onClick={this.showAddCoursePage}>
            Add Course
          </button>
        </div>
        {isLoading
          ? (
            <div className="loader-container">
              <Loader size="30" className="loader-component" />
            </div>
          )
          : this.renderCoursesTable(allCourses)
        }
      </div>
    );
  }
}

const mapStateToProps = ({ courses }) => {
  const sortedCourses = _.sortBy(
    [...courses.allCourses], course => course.title.toLowerCase()
  );
  return ({ courses: { ...courses, allCourses: sortedCourses } });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseActions, dispatch)
});

CoursesPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
