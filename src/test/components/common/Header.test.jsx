/* eslint-disable */
import HeaderContainer, { Header } from '../../../components/common/Header';


const initialState = {
  courses: { allCourses: [{}, {}] },
  authors: { allAuthors: [{}, {}] }
};

const setup = () => {
  const store = storeMock(initialState);

  return {
    container: shallow(<HeaderContainer store={store} />),
    pressentation: shallow(<Header store={store} />)
  };
};

let shallowWrapper;

describe('<Header /> component test', () => {
  it('renders component without crashing', () => {
    shallowWrapper = setup().container;
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should has one div element', () => {
    shallowWrapper = setup().pressentation;

    expect(shallowWrapper.find('.header-container')).toBeDefined();
    expect(shallowWrapper.find('.header-container').children()).toHaveLength(2);
  });

  it('should show previously rolled value', () => {
    shallowWrapper = setup().container;
    const coursesLength = initialState.courses.allCourses.length;
    const authorsLength = initialState.authors.allAuthors.length;

    // test that the state values were correctly passed as props
    expect(shallowWrapper.props().numberOfCourses).toEqual(coursesLength);
    expect(shallowWrapper.props().numberOfAuthors).toEqual(authorsLength);
  });
});
