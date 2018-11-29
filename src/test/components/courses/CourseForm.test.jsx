/* eslint-disable */
import CourseForm from '../../../components/course/CourseForm';
import courseMock from '../../__mocks__/courseMock';


describe('<CourseForm />', () => {
  const setup = () => {
    const props = {
      course: courseMock.existingCourse,
      handleOnSave: jest.fn(),
      handleOnChange: jest.fn(),
      handleOnFocus: jest.fn(),
      isSaving: false,
      errors: {}
    };

    return {
      shallowWrapper: shallow(<CourseForm {...props} />),
      props
    };
  };

  it('renders component without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should call onChange() event', () => {
    const { shallowWrapper, props } = setup();
    shallowWrapper.setProps({
      ...props,
      isSaving: true
    });

    expect(shallowWrapper.find('input').props().value).toEqual('Saving...');
  });

  it('renders three(3) <TextInput /> child components', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.find('TextInput').length).toBe(3);
  });

  it('calls handleOnSave method when form is submitted', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('input').simulate('click');
    expect(props.handleOnSave).toHaveBeenCalled();
  });
});
