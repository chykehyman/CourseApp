/* eslint-disable */
import Routes from '../../Routes';


describe('<Routes />', () => {
  it('renders entire app route components without crashing', () => {
    const shallowWrapper = shallow(<Routes />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
