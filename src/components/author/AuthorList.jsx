import React from 'react';
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';


const propTypes = {
  authors: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
};

const AuthorList = ({ authors, handleDelete }) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {authors
        .map(author => (
          <AuthorListRow
            key={author.id}
            author={author}
            handleDelete={handleDelete} />
        ))
      }
    </tbody>
  </table>
);

AuthorList.propTypes = propTypes;

export default AuthorList;
