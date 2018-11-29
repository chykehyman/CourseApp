/* eslint-disable */
import AuthorListRow from '../../../components/author/AuthorListRow';
import authorsMock from '../../__mocks__/authorMock';


describe('AuthorListRow component', () => {
  const setup = () => {
    const props = {
      author: authorsMock.author,
      handleDelete: jest.fn()
    };

    return {
      shallowWrapper: shallow(<AuthorListRow {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should invoke the handleDelete method', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('button').simulate('click', {});

    expect(props.handleDelete).toHaveBeenCalledWith(props.author.id);
  });
});
