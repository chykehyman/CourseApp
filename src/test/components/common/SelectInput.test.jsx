/* eslint-disable */
import SelectInput from '../../../components/common/SelectInput';

const setup = (error) => {
  const props = {
    name: '',
    label: '',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    defaultOption: '',
    value: '',
    error,
    options: [{ id: '', firstName: '', lastName: '' }]
  };

  return mount(<SelectInput {...props} />);
};

let mountWrapper;

describe('<SelectInput /> component test', () => {
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
    mountWrapper = setup('Select an author');

    expect(mountWrapper.find('.has-error')).toBeDefined();
    expect(mountWrapper.find('.has-error').length).toEqual(1);
    expect(mountWrapper.find('.field-error')).toHaveLength(1);
    expect(mountWrapper.find('.field-error').get(0).props.children).toEqual('Select an author');
  });
});
