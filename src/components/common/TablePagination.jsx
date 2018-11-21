import React from 'react';
import PropTypes from 'prop-types';

import ReactPaginate from 'react-paginate';

const propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

const TablePagination = ({ pageCount, currentPage, handlePageChange }) => (
  <div className="text-center">
    <ReactPaginate
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      initialPage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      disableInitialCallback
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  </div>
);

TablePagination.propTypes = propTypes;

export default TablePagination;
