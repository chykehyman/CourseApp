import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import _ from 'lodash';

import AuthorList from './AuthorList';
import NoItems from '../common/NoItems';
import TablePagination from '../common/TablePagination';
import * as authorActions from '../../actions/creators/authorActions';
import { AUTHORS_PAGE_CHANGE as actionType } from '../../actions/constants/actionTypes';
import pagination from '../../helpers/pagination';

const propTypes = {
  authors: PropTypes.shape({
    allAuthors: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    deleteAuthor: PropTypes.func.isRequired,
    pageChange: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

class AuthorsPage extends Component {
 actions = this.props.actions;

 componentWillUpdate({ authors: { pageSize, pageCount, currentPage } }) {
   if (pageSize === 0 && currentPage > 1 && pageCount >= 1) {
     this.actions.pageChange(currentPage - 1);
   }
 }

 componentWillUnmount() {
   this.actions.pageChange(1, actionType);
 }

  showAddAuthorPage = () => {
    const { history } = this.props;
    history.push('/authors/add');
  };

  handleOnAuthorDelete = (authorId) => {
    this.actions.deleteAuthor(authorId);
  };

  handleOnPageChange = ({ selected }) => {
    const pageToLoad = selected + 1;
    this.actions.pageChange(pageToLoad, actionType);
  }

  renderAuthorsTable = (paginatedAuthors) => {
    if (paginatedAuthors.length > 0) {
      return (
        <AuthorList
          authors={paginatedAuthors}
          handleDelete={this.handleOnAuthorDelete} />
      );
    }
    return <NoItems displayText="There are no registered authors" />;
  }

  render() {
    const {
      authors: {
        allAuthors,
        isFetching,
        currentPage,
        pageCount
      }
    } = this.props;
    return (
      <div>
        <div className="top-container">
          <h2>Authors</h2>
          <button
            type="button"
            className="btn btn-outline-primary add-course-button btn-sm"
            onClick={this.showAddAuthorPage}>
            Add Author
          </button>
        </div>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="30" className="loader-component" />
            </div>
          )
          : this.renderAuthorsTable(allAuthors)
        }
        {allAuthors.length > 0 && (
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

const mapStateToProps = ({ authors }) => {
  const sortedAuthors = _.sortBy(
    [...authors.allAuthors], author => author.firstName.toLowerCase()
  );

  const data = pagination(sortedAuthors, authors.currentPage);

  return ({
    authors: {
      ...authors,
      allAuthors: data.paginatedItems,
      pageCount: data.totalPageCount,
      pageSize: data.pageItemsSize
    }
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authorActions, dispatch)
});

AuthorsPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
