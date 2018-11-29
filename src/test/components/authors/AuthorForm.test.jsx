/* eslint-disable */
import AuthorForm from '../../../components/author/AuthorForm';
import authorMock from '../../__mocks__/authorMock';


describe('<AuthorForm />', () => {
  const setup = () => {
    const props = {
      author: authorMock.author,
      handleOnSave: jest.fn(),
      handleOnChange: jest.fn(),
      handleOnFocus: jest.fn(),
      isSaving: false,
      errors: {}
    };

    return {
      shallowWrapper: shallow(<AuthorForm {...props} />),
      props
    };
  };

  it('renders component without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should set button input text to "Saving..."', () => {
    const { shallowWrapper, props } = setup();
    shallowWrapper.setProps({
      ...props,
      isSaving: true
    });

    expect(shallowWrapper.find('input').props().value).toEqual('Saving...');
  });

  it('renders two(2) <TextInput /> child components', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.find('TextInput').length).toBe(2);
  });

  it('calls handleOnSave method when form is submitted', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('input').simulate('click');
    expect(props.handleOnSave).toHaveBeenCalled();
  });
});
