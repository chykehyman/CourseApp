/* eslint-disable */
import CourseList from '../../../components/course/CourseList';
import courseMock from '../../__mocks__/courseMock';


describe('<CourseList /> component', () => {
  const setup = () => {
    const props = {
      courses: courseMock.courses,
      handleDelete: jest.fn()
    };

    return {
      shallowWrapper: shallow(<CourseList {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should check that proper table element are rendered', () => {
    const { shallowWrapper, props } = setup();

    expect(shallowWrapper.find('table').children()).toHaveLength(2);
    expect(shallowWrapper.find('tr').children()).toHaveLength(6);
    expect(shallowWrapper.find('CourseListRow')).toHaveLength(props.courses.length);
  });
});
