/* eslint-disable */
import AboutPage from '../../../components/about/AboutPage';


describe('<AboutPage /> component test', () => {
  it('renders page header for profile component without crashing', () => {
    const shallowWrapper = shallow(<AboutPage />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
