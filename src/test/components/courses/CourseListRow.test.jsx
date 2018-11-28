/* eslint-disable */
import CourseListRow from '../../../components/course/CourseListRow';
import coursesMock from '../../__mocks__/courseMock';


describe('CourseListRow component', () => {
  const setup = () => {
    const props = {
      course: coursesMock.existingCourse,
      handleDelete: jest.fn()
    };

    return {
      shallowWrapper: shallow(<CourseListRow {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should invoke the handleDelete method', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('button').simulate('click', {});

    expect(props.handleDelete).toHaveBeenCalledWith(props.course.id);
  });
});
