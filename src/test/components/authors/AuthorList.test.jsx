/* eslint-disable */
import AuthorList from '../../../components/author/AuthorList';
import authorsMock from '../../__mocks__/authorMock';


describe('AuthorList component', () => {
  const setup = () => {
    const props = {
      authors: authorsMock.authors,
      handleDelete: jest.fn()
    };

    return {
      shallowWrapper: shallow(<AuthorList {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should check that proper table element are rendered', () => {
    const { shallowWrapper, props } = setup();

    expect(shallowWrapper.find('table').children()).toHaveLength(2);
    expect(shallowWrapper.find('tr').children()).toHaveLength(4);
    expect(shallowWrapper.find('AuthorListRow')).toHaveLength(props.authors.length);
  });
});
