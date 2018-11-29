/* eslint-disable */
import { ManageCoursePage } from '../../../components/course/ManageCoursePage';
import coursesMock from '../../__mocks__/courseMock';


describe('<ManageCoursePage /> component', () => {
  const setup = () => {
    const props = {
      actions: {
        loadSingleCourse: jest.fn(),
        saveCourse: jest.fn()
      },
      course: {
        selectedCourse: {},
        isFetching: false,
        isSaving: false
      },
      allCourses: coursesMock.courses,
      match: {
        params: {
          id: 'add'
        }
      },
      history: {
        push: jest.fn()
      }
    };

    const state = {
      errors: {},
      isBlocking: false
    };

    return {
      pressentationWrapper: shallow(<ManageCoursePage {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      name: 'title',
      value: 'some title'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('render component without crashing', () => {
    const { pressentationWrapper } = setup();

    expect(toJson(pressentationWrapper)).toMatchSnapshot();
  });

  it('invokes `componentDidMount` when mounted', () => {
    jest.spyOn(ManageCoursePage.prototype, 'componentDidMount');
    setup();

    expect(ManageCoursePage.prototype.componentDidMount).toHaveBeenCalled();
    ManageCoursePage.prototype.componentDidMount.mockRestore();
  });

  it('renders a <Prompt /> child component', () => {
    const { pressentationWrapper } = setup();
    expect(pressentationWrapper.find('Prompt').length).toBe(1);
  });

  it('should show <Prompt /> component if value of its child prop(when) is true', () => {
    const { pressentationWrapper, state } = setup();

    pressentationWrapper.setState({
      ...state, isBlocking: true
    });

    expect(pressentationWrapper.find('Prompt').props().when).toEqual(true);
  });

  it('invokes handleOnChange method', () => {
    const { pressentationWrapper } = setup();
    const handleOnChangeSpy = jest
      .spyOn(pressentationWrapper.instance(), 'handleOnChange');
    pressentationWrapper.instance().handleOnChange(event);

    expect(handleOnChangeSpy).toHaveBeenCalled();
  });

  it('invokes handleOnSave method', () => {
    const { pressentationWrapper } = setup();
    const handleOnSaveSpy = jest.spyOn(pressentationWrapper.instance(), 'handleOnSave');
    pressentationWrapper.instance().handleOnSave(event);
    expect(handleOnSaveSpy).toHaveBeenCalled();
  });

  it('invokes handleOnFocus method', () => {
    const { pressentationWrapper } = setup();
    const handleOnFocusSpy = jest.spyOn(pressentationWrapper.instance(), 'handleOnFocus');
    pressentationWrapper.instance().handleOnFocus(event);
    expect(handleOnFocusSpy).toHaveBeenCalled();
  });

  it('shows <Loader /> component when `isFetching` is true', () => {
    const { pressentationWrapper, props } = setup();
    pressentationWrapper.setProps({
      ...props,
      course: { ...props.course, isFetching: true }
    });

    expect(pressentationWrapper.find('.loader-container')).toHaveLength(1);
  });

  it('shows <NotFoundPage /> component when `courseId` does not exist', () => {
    const { pressentationWrapper, props } = setup();
    pressentationWrapper.setProps({
      ...props,
      course: { ...props.course, selectedCourse: undefined }
    });

    expect(pressentationWrapper.find('NotFoundPage')).toHaveLength(1);
  });
});
