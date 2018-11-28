/* eslint-disable */
import HomePage from '../../../components/home/HomePage';


describe('<HomePage /> component test', () => {
  it('renders page header for profile component without crashing', () => {
    const shallowWrapper = shallow(<HomePage />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
