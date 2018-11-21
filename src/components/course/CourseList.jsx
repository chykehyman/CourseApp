import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';


const propTypes = {
  courses: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
};

const CourseList = ({ courses, handleDelete }) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {courses
        .map(course => (
          <CourseListRow
            key={course.id}
            course={course}
            handleDelete={handleDelete}
            />
        ))
      }
    </tbody>
  </table>
);

CourseList.propTypes = propTypes;

export default CourseList;
