/* eslint-disable */
import CoursesPageContainer, { CoursesPage } from '../../../components/course/CoursesPage';
import courseMock from '../../__mocks__/courseMock';


describe('courses page', () => {
  const initialState = {
    courses: { allCourses: courseMock.courses }
  };

  const store = storeMock(initialState);

  const setup = () => {
    const props = {
      courses: {
        allCourses: [],
        isFetching: false,
        pageCount: 1,
        pageSize: 0,
        currentPage: 2
      },
      actions: {
        deleteCourse: jest.fn(),
        pageChange: jest.fn()
      },
      history: {
        push: jest.fn()
      }
    };

    return {
      props,
      containerWrapper: shallow(<CoursesPageContainer store={store} />),
      presentationWrapper: shallow(<CoursesPage { ...props } />)
    };
  };


  it('should render without crashing', () => {
    const { presentationWrapper } = setup();
    expect(toJson(presentationWrapper)).toMatchSnapshot();
  });

  describe('empty courses list', () => {
    const { presentationWrapper } = setup();

    it('should render the NoItems component', () => {
      const noItemComponent = presentationWrapper.find('NoItems');
      expect(noItemComponent.length).toBe(1);
      expect(noItemComponent.props().displayText).toBe('There are no available courses');
    });

    it('should render a div with two children', () => {
      expect(presentationWrapper.find('div').children().length).toBe(2);
      expect(presentationWrapper.find('div').children().find('TopSection').props().pageTitle).toBe('Courses');
      expect(presentationWrapper.find('div').children().find('TopSection').props().buttonLabel).toBe('Add Course');
    });

    it('should not render the TablePagination component', () => {
      expect(presentationWrapper.find('div').children()).not.toContain('TablePagination');
    });
  });

  describe('when component is loading', () => {
    it('should show the loader component', () => {
      const { presentationWrapper, props } = setup();
      presentationWrapper.setProps({
        ...props, courses: { ...props.courses, isFetching: true }
      });
      const loaderDiv = presentationWrapper.find('.loader-container');

      expect(loaderDiv).toHaveLength(1);
      expect(loaderDiv.children().find('Loader')).toBeDefined();
    });
  });

  describe('when courses list is not empty', () => {
    const { presentationWrapper, props } = setup();
    presentationWrapper.setProps({
      ...props,
      courses: {
        ...props.courses,
        allCourses: [{}, {}]
      }
    });

    it('should render the CourseList component', () => {
      expect(presentationWrapper.find('CourseList')).toHaveLength(1);
    });

    it('should render the TablePagination component', () => {
      expect(presentationWrapper.find('TablePagination').length).toBe(1);
    });
  });

  describe('invoke component instance methods', () => {
    let wrapper;

    beforeEach(() => {
      const { presentationWrapper } = setup();
      wrapper = presentationWrapper;
    });

    it('should invoke componentWillUnmount lifecycle method when component is unmounting', () => {
      const componentWillUnmountSpy = jest.spyOn(
        wrapper.instance(), 'componentWillUnmount'
      );

      wrapper.unmount();

      expect(componentWillUnmountSpy).toHaveBeenCalled();
    });

    it('should invoke showAddCoursePage method', () => {
      const showAddCoursePageSpy = jest.spyOn(
        wrapper.instance(), 'showAddCoursePage'
      );

      wrapper.instance().showAddCoursePage();

      expect(showAddCoursePageSpy).toHaveBeenCalled();
    });

    it('should invoke the handleOnPageChange method', () => {
      const handleOnPageChangeSpy = jest.spyOn(
        wrapper.instance(), 'handleOnPageChange'
      );
      wrapper.instance().handleOnPageChange({ selected: 1 });
      expect(handleOnPageChangeSpy).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  it('should invoke the componentWillUpdate lifecycle when props changes', () => {
    const {
      presentationWrapper,
      props: { courses: { pageSize, pageCount, currentPage } }
    } = setup();

    const componentWillUpdateSpy = jest.spyOn(
      presentationWrapper.instance(), 'componentWillUpdate'
    );

    presentationWrapper.instance()
      .componentWillUpdate({ courses: { pageSize, pageCount, currentPage } });

    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });

  it('should invoke the handleOnCourseDelete action when deleting a course', () => {
    const {
      presentationWrapper
    } = setup();

    const componentWillUpdateSpy = jest.spyOn(
      presentationWrapper.instance(), 'handleOnCourseDelete'
    );

    presentationWrapper.instance()
      .handleOnCourseDelete(courseMock.courses[1].id);

    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });
});
