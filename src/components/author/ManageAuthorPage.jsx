import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loader from 'react-md-spinner';

import AuthorForm from './AuthorForm';
import NotFoundPage from '../common/NotFoundPage';
import * as authorActions from '../../actions/creators/authorActions';

import { validateFormData } from '../../helpers/validations';


const propTypes = {
  actions: PropTypes.shape({
    loadSingleAuthor: PropTypes.func.isRequired,
    saveAuthor: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
  }).isRequired,
  author: PropTypes.shape({
    selectedAuthor: PropTypes.shape(),
    isFetching: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired
  }),
  allAuthors: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

const defaultProps = {
  author: PropTypes.shape({
    selectedAuthor: {},
    isFetching: false,
    isSaving: false
  })
};

class ManageAuthorPage extends Component {
  match = this.props.match;

  history = this.props.history;

  initialFormState = {
    author: {
      id: '',
      firstName: '',
      lastName: ''
    },
    errors: {},
    isBlocking: false
  };

  state = { ...this.initialFormState };

  componentDidMount() {
    const { match, actions } = this.props;

    if (this.match.params.id !== 'add') {
      actions.loadSingleAuthor(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { author: { selectedAuthor } } = this.props;
    const { author } = nextProps;
    if (this.match.params.id !== 'add') {
      if (author.selectedAuthor !== selectedAuthor) {
        this.setState(prevState => ({
          ...prevState,
          author: nextProps.author.selectedAuthor
        }));
      }
    } else {
      this.setState(prevState => ({
        ...prevState
      }));
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      author: { ...prevState.author, [name]: value },
      isBlocking: true
    }));
  };

  isValid = (author) => {
    const { errors, isValid } = validateFormData(author);
    if (!isValid) {
      this.setState(() => ({
        errors
      }));
    }
    return isValid;
  }

  handleOnFocus = (event) => {
    event.persist();
    this.setState(prevState => ({
      errors: { ...prevState.errors, [event.target.name]: '' }
    }));
  }

  handleOnSave = (event) => {
    const { actions } = this.props;
    const { author } = this.state;

    event.preventDefault();

    if (this.isValid(author)) {
      actions.saveAuthor(author)
        .then(() => {
          this.setState(prevState => ({ isBlocking: !prevState }), () => {
            this.history.push('/authors');
          });
        });
    }
  };

  render() {
    const { author, errors, isBlocking } = this.state;
    const { allAuthors, author: { isFetching, isSaving, selectedAuthor } } = this.props;

    if (!isFetching && this.match.params.id && typeof selectedAuthor === 'undefined') {
      return <NotFoundPage history={this.history} />;
    }

    return (
      <Fragment>
        <Prompt
          when={isBlocking}
          message={
            location => `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="top-container">
          <h1>Manage Author</h1>
        </div>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="30" className="loader-component" />
            </div>
          )
          : (
            <AuthorForm
              allAuthors={allAuthors}
              author={author}
              handleOnChange={this.handleOnChange}
              handleOnSave={this.handleOnSave}
              handleOnFocus={this.handleOnFocus}
              isSaving={isSaving}
              errors={errors} />
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  author: state.authors,
  allAuthors: state.authors.allAuthors
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authorActions, dispatch)
});

ManageAuthorPage.propTypes = propTypes;
ManageAuthorPage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
