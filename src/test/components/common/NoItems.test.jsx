/* eslint-disable */
import NoItems from '../../../components/common/NoItems';

const props = {
  displayText: ''
};
describe('<NoItems /> component test', () => {
  it('renders component without crashing', () => {
    const shallowWrapper = shallow(<NoItems {...props} />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
