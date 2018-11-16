import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loader from 'react-md-spinner';
import toastr from 'toastr';

import CourseForm from './CourseForm';
import * as courseActions from '../../actions/creators/courseActions';
import * as authorActions from '../../actions/creators/authorActions';


const propTypes = {
  actions: PropTypes.shape({
    loadSingleCourse: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
  }).isRequired,
  course: PropTypes.shape({
    selectedCourse: PropTypes.shape().isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
  allAuthors: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

class ManageCoursePage extends Component {
  initialFormState = {
    course: {
      id: '',
      watchHref: '',
      title: '',
      authorId: '',
      length: '',
      category: ''
    },
    errors: {}
  };

  state = this.initialFormState;

  componentDidMount() {
    const { match, actions } = this.props;

    actions.loadAuthors();

    if (typeof match.params.id !== 'undefined') {
      actions.loadSingleCourse(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    if (typeof match.params.id !== 'undefined') {
      this.setState(prevState => ({
        ...prevState,
        course: nextProps.course.selectedCourse
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        course: {}
      }));
    }
  }


  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      course: { ...prevState.course, [name]: value }
    }));
  };

  handleOnSave = (event) => {
    const { actions, history } = this.props;
    const { course } = this.state;

    event.preventDefault();

    actions.saveCourse(course);
    toastr.success('Course Saved');
    history.push('/courses');
  };

  render() {
    const { course, errors } = this.state;
    const { allAuthors, course: { isLoading } } = this.props;
    return (
      <div>
        <div className="top-container">
          <h1>Manage Course</h1>
        </div>
        {isLoading
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
              isLoading={isLoading}
              errors={errors} />
          )
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
