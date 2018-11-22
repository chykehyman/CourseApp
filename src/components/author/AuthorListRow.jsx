import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const propTypes = {
  author: PropTypes.shape().isRequired,
  handleDelete: PropTypes.func.isRequired
};

const AuthorListRow = ({ author, handleDelete }) => (
  <tr>
    <td><Link to={`/authors/${author.id}`}>{author.id}</Link></td>
    <td>{author.firstName}</td>
    <td>{author.lastName}</td>
    <td>
      <button
        type="button"
        onClick={() => handleDelete(author.id)}
        className="btn btn-outline-danger btn-sm">
        Delete
      </button>
    </td>
  </tr>
);

AuthorListRow.propTypes = propTypes;

export default AuthorListRow;
