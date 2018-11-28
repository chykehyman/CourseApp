/* eslint-disable */
import TextInput from '../../../components/common/TextInput';

const setup = (error) => {
  const props = {
    name: '',
    label: '',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    placeholder: '',
    value: '',
    error
  };

  return mount(<TextInput {...props} />);
};

let mountWrapper;

describe('<TextInput /> component test', () => {
  it('renders component without crashing', () => {
    mountWrapper = setup('');
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should not render error divs when no error occur', () => {
    mountWrapper = setup('');
    expect(mountWrapper.find('.has-error').length).toEqual(0);
    expect(mountWrapper.find('.field-error').length).toEqual(0);
  });

  it('renders error divs when error occur', () => {
    mountWrapper = setup('field is required');
    expect(mountWrapper.find('.has-error').length).toEqual(1);
    expect(mountWrapper.find('.field-error').length).toEqual(1);
  });
});
