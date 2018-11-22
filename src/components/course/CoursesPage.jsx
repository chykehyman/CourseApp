import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import _ from 'lodash';

import CourseList from './CourseList';
import NoItems from '../common/NoItems';
import TablePagination from '../common/TablePagination';
import * as courseActions from '../../actions/creators/courseActions';
import { COURSES_PAGE_CHANGE as actionType } from '../../actions/constants/actionTypes';
import pagination from '../../helpers/pagination';

const propTypes = {
  courses: PropTypes.shape({
    allCourses: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    deleteCourse: PropTypes.func.isRequired,
    pageChange: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

class CoursesPage extends Component {
 actions = this.props.actions;

 componentWillUpdate({ courses: { pageSize, pageCount, currentPage } }) {
   if (pageSize === 0 && currentPage > 1 && pageCount >= 1) {
     this.actions.pageChange(currentPage - 1);
   }
 }

 componentWillUnmount() {
   this.actions.pageChange(1, actionType);
 }

  showAddCoursePage = () => {
    const { history } = this.props;
    history.push('/courses/add');
  };

  handleOnCourseDelete = (courseId) => {
    this.actions.deleteCourse(courseId);
  };

  handleOnPageChange = ({ selected }) => {
    const pageToLoad = selected + 1;
    this.actions.pageChange(pageToLoad, actionType);
  }

  renderCoursesTable = (paginatedCourses) => {
    if (paginatedCourses.length > 0) {
      return (
        <CourseList
          courses={paginatedCourses}
          handleDelete={this.handleOnCourseDelete} />
      );
    }
    return <NoItems displayText="There are no available courses" />;
  }

  render() {
    const {
      courses: {
        allCourses,
        isFetching,
        currentPage,
        pageCount
      }
    } = this.props;
    return (
      <div>
        <div className="top-container">
          <h2>Courses</h2>
          <button
            type="button"
            className="btn btn-outline-primary add-course-button btn-sm"
            onClick={this.showAddCoursePage}>
            Add Course
          </button>
        </div>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="30" className="loader-component" />
            </div>
          )
          : this.renderCoursesTable(allCourses)
        }
        {allCourses.length > 0 && (
          <TablePagination
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageChange={this.handleOnPageChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ courses }) => {
  const sortedCourses = _.sortBy(
    [...courses.allCourses], course => course.title.toLowerCase()
  );

  const data = pagination(sortedCourses, courses.currentPage);

  return ({
    courses: {
      ...courses,
      allCourses: data.paginatedItems,
      pageCount: data.totalPageCount,
      pageSize: data.pageItemsSize
    }
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseActions, dispatch)
});

CoursesPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
