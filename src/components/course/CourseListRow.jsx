import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const propTypes = {
  course: PropTypes.shape().isRequired,
  handleDelete: PropTypes.func.isRequired
};

const CourseListRow = ({ course, handleDelete }) => (
  <tr>
    <td>
      <a href={course.watchHref} className="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener noreferrer">Watch</a>
    </td>
    <td><Link to={`/courses/${course.id}`}>{course.title}</Link></td>
    <td>{course.authorId}</td>
    <td>{course.category}</td>
    <td>{course.length}</td>
    <td>
      <button
        type="button"
        onClick={() => handleDelete(course.id)}
        className="btn btn-outline-danger btn-sm">
        Delete
      </button>
    </td>
  </tr>
);

CourseListRow.propTypes = propTypes;

export default CourseListRow;
