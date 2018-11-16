import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import CourseList from './CourseList';
import * as courseActions from '../../actions/creators/courseActions';

const propTypes = {
  courses: PropTypes.shape({
    allCourses: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape().isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

class CoursesPage extends Component {
  componentDidMount() {
    const { actions, courses: { allCourses } } = this.props;

    actions.loadCourses();
  }

  showAddCoursePage = () => {
    const { history } = this.props;
    history.push('/course');
  };

  courseRow = (course, index) => (
    <div key={index}>{course.title}</div>
  );

  render() {
    const { courses: { allCourses, isLoading } } = this.props;
    return (
      <div>
        <div className="top-container">
          <h1>Courses</h1>
          <button
            type="button"
            className="btn btn-outline-info add-course-button btn-sm"
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
          : <CourseList courses={allCourses} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseActions, dispatch)
});

CoursesPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
