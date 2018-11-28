/* eslint-disable */
import TopSection from '../../../components/common/TopSection';

const setup = () => {
  const props = {
    pageTitle: '',
    buttonLabel: '',
    redirectFunc: jest.fn()
  };

  return mount(<TopSection {...props} />);
};

let mountWrapper;

describe('<TopSection /> component test', () => {
  it('renders component without crashing', () => {
    mountWrapper = setup();
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('renders appropriate elements', () => {
    mountWrapper = setup();
    expect(mountWrapper.find('h2').length).toEqual(1);
    expect(mountWrapper.find('button').length).toEqual(1);
  });
});
