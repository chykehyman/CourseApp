/* eslint-disable */
import { ManageAuthorPage } from '../../../components/author/ManageAuthorPage';
import authorsMock from '../../__mocks__/authorMock';


describe('<ManageAuthorPage /> component', () => {
  const setup = () => {
    const props = {
      actions: {
        loadSingleAuthor: jest.fn(),
        saveAuthor: jest.fn(),
        loadAuthors: jest.fn()
      },
      author: {
        selectedAuthor: {},
        isFetching: false,
        isSaving: false
      },
      allAuthors: authorsMock.authors,
      match: {
        params: {
          id: 'add'
        }
      },
      history: {
        push: jest.fn()
      }
    };

    const state = {
      errors: {},
      isBlocking: false
    };

    return {
      pressentationWrapper: shallow(<ManageAuthorPage {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      name: 'firstName',
      value: 'some name'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('render component without crashing', () => {
    const { pressentationWrapper } = setup();

    expect(toJson(pressentationWrapper)).toMatchSnapshot();
  });

  it('invokes `componentDidMount` when mounted', () => {
    jest.spyOn(ManageAuthorPage.prototype, 'componentDidMount');
    setup();

    expect(ManageAuthorPage.prototype.componentDidMount).toHaveBeenCalled();
    ManageAuthorPage.prototype.componentDidMount.mockRestore();
  });

  it('renders a <Prompt /> child component', () => {
    const { pressentationWrapper } = setup();
    expect(pressentationWrapper.find('Prompt').length).toBe(1);
  });

  it('should show <Prompt /> component if value of its child prop(when) is true', () => {
    const { pressentationWrapper, state } = setup();

    pressentationWrapper.setState({
      ...state, isBlocking: true
    });

    expect(pressentationWrapper.find('Prompt').props().when).toEqual(true);
  });

  it('invokes handleOnChange method', () => {
    const { pressentationWrapper } = setup();
    const handleOnChangeSpy = jest
      .spyOn(pressentationWrapper.instance(), 'handleOnChange');
    pressentationWrapper.instance().handleOnChange(event);

    expect(handleOnChangeSpy).toHaveBeenCalled();
  });

  it('invokes handleOnSave method', () => {
    const { pressentationWrapper } = setup();
    const handleOnSaveSpy = jest.spyOn(pressentationWrapper.instance(), 'handleOnSave');
    pressentationWrapper.instance().handleOnSave(event);
    expect(handleOnSaveSpy).toHaveBeenCalled();
  });

  it('invokes handleOnFocus method', () => {
    const { pressentationWrapper } = setup();
    const handleOnFocusSpy = jest.spyOn(pressentationWrapper.instance(), 'handleOnFocus');
    pressentationWrapper.instance().handleOnFocus(event);
    expect(handleOnFocusSpy).toHaveBeenCalled();
  });

  it('shows <Loader /> component when `isFetching` is true', () => {
    const { pressentationWrapper, props } = setup();
    pressentationWrapper.setProps({
      ...props,
      author: { ...props.author, isFetching: true }
    });

    expect(pressentationWrapper.find('.loader-container')).toHaveLength(1);
  });

  it('shows <NotFoundPage /> component when `authorId` does not exist', () => {
    const { pressentationWrapper, props } = setup();
    pressentationWrapper.setProps({
      ...props,
      author: { ...props.author, selectedAuthor: undefined }
    });

    expect(pressentationWrapper.find('NotFoundPage')).toHaveLength(1);
  });
});
