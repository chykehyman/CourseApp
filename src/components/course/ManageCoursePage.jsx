import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loader from 'react-md-spinner';

import CourseForm from './CourseForm';
import NotFoundPage from '../common/NotFoundPage';
import * as courseActions from '../../actions/creators/courseActions';
import * as authorActions from '../../actions/creators/authorActions';

import { validateFormData } from '../../helpers/validations';


const propTypes = {
  actions: PropTypes.shape({
    loadSingleCourse: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired
  }).isRequired,
  course: PropTypes.shape({
    selectedCourse: PropTypes.shape(),
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
  course: PropTypes.shape({
    selectedCourse: {},
    isFetching: false,
    isSaving: false
  })
};

export class ManageCoursePage extends Component {
  match = this.props.match;

  history = this.props.history;

  initialFormState = {
    course: {
      id: '',
      watchHref: '',
      title: '',
      authorId: '',
      length: '',
      category: ''
    },
    errors: {},
    isBlocking: false
  };

  state = { ...this.initialFormState };

  componentDidMount() {
    const { actions } = this.props;

    if (this.match.params.id !== 'add') {
      actions.loadSingleCourse(this.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, course: { selectedCourse } } = this.props;
    const { course } = nextProps;
    if (match.params.id !== 'add') {
      if (course.selectedCourse !== selectedCourse) {
        this.setState(prevState => ({
          ...prevState,
          course: nextProps.course.selectedCourse
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
      course: { ...prevState.course, [name]: value },
      isBlocking: true
    }));
  };

  isValid = (course) => {
    const { errors, isValid } = validateFormData(course);
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
    const { course } = this.state;

    event.preventDefault();

    if (this.isValid(course)) {
      actions.saveCourse(course)
        .then(() => {
          this.setState(prevState => ({ isBlocking: !prevState }), () => {
            this.history.push('/courses');
          });
        });
    }
  };

  render() {
    const { course, errors, isBlocking } = this.state;
    const { allAuthors, course: { isFetching, isSaving, selectedCourse } } = this.props;

    if (!isFetching && this.match.params.id && typeof selectedCourse === 'undefined') {
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
          <h2>Manage Course</h2>
        </div>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="30" className="loader-component" />
            </div>
          )
          : (
            <CourseForm
              allAuthors={allAuthors}
              course={course}
              handleOnChange={this.handleOnChange}
              handleOnSave={this.handleOnSave}
              handleOnFocus={this.handleOnFocus}
              isFetching={isFetching}
              isSaving={isSaving}
              errors={errors} />
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  course: state.courses,
  allAuthors: state.authors.allAuthors
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...courseActions, ...authorActions }, dispatch)
});

ManageCoursePage.propTypes = propTypes;
ManageCoursePage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
