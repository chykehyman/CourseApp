/* eslint-disable */
import AuthorsPageContainer, { AuthorsPage } from '../../../components/author/AuthorsPage';
import authorsMock from '../../__mocks__/authorMock';


describe('authors page', () => {
  const initialState = {
    authors: { allAuthors: authorsMock.authors }
  };

  const store = storeMock(initialState);

  const setup = () => {
    const props = {
      authors: {
        allAuthors: [],
        isFetching: false,
        pageCount: 1,
        pageSize: 0,
        currentPage: 2
      },
      actions: {
        deleteAuthor: jest.fn(),
        pageChange: jest.fn()
      },
      history: {
        push: jest.fn()
      }
    };

    return {
      props,
      containerWrapper: shallow(<AuthorsPageContainer store={store} />),
      presentationWrapper: shallow(<AuthorsPage { ...props } />)
    };
  };


  it('should render without crashing', () => {
    const { presentationWrapper } = setup();
    expect(toJson(presentationWrapper)).toMatchSnapshot();
  });

  describe('empty authors list', () => {
    const { presentationWrapper } = setup();

    it('should render the NoItems component', () => {
      const noItemComponent = presentationWrapper.find('NoItems');
      expect(noItemComponent.length).toBe(1);
      expect(noItemComponent.props().displayText).toBe('There are no registered authors');
    });

    it('should render a div with two children', () => {
      expect(presentationWrapper.find('div').children().length).toBe(2);
      expect(presentationWrapper.find('div').children().find('TopSection').props().pageTitle).toBe('Authors');
      expect(presentationWrapper.find('div').children().find('TopSection').props().buttonLabel).toBe('Add Author');
    });

    it('should not render the TablePagination component', () => {
      expect(presentationWrapper.find('div').children()).not.toContain('TablePagination');
    });
  });

  describe('when component is loading', () => {
    it('should show the loader component', () => {
      const { presentationWrapper, props } = setup();
      presentationWrapper.setProps({ ...props, authors: { ...props.authors, isFetching: true } });
      const loaderDiv = presentationWrapper.find('.loader-container');

      expect(loaderDiv).toHaveLength(1);
      expect(loaderDiv.children().find('Loader')).toBeDefined();
    });
  });

  describe('when authors list is not empty', () => {
    const { presentationWrapper, props } = setup();
    presentationWrapper.setProps({
      ...props,
      authors: {
        ...props.authors,
        allAuthors: [{}, {}]
      }
    });

    it('should render the AuthorList component', () => {
      expect(presentationWrapper.find('AuthorList')).toHaveLength(1);
    });

    it('should render the TablePagination component', () => {
      expect(presentationWrapper.find('TablePagination').length).toBe(1);
    });
  });

  describe('invoke component instance methods', () => {
    let wrapper;

    beforeEach(() => {
      const { presentationWrapper } = setup();
      wrapper = presentationWrapper;
    });

    it('should invoke componentWillUnmount lifecycle method when component is unmounting', () => {
      const componentWillUnmountSpy = jest.spyOn(
        wrapper.instance(), 'componentWillUnmount'
      );

      wrapper.unmount();

      expect(componentWillUnmountSpy).toHaveBeenCalled();
    });

    it('should invoke showAddAuthorPage method', () => {
      const showAddAuthorPageSpy = jest.spyOn(
        wrapper.instance(), 'showAddAuthorPage'
      );

      wrapper.instance().showAddAuthorPage();

      expect(showAddAuthorPageSpy).toHaveBeenCalled();
    });

    it('should invoke the handleOnPageChange method', () => {
      const handleOnPageChangeSpy = jest.spyOn(
        wrapper.instance(), 'handleOnPageChange'
      );
      wrapper.instance().handleOnPageChange({ selected: 1 });
      expect(handleOnPageChangeSpy).toHaveBeenCalledWith({ selected: 1 });
    });
  });

  it('should invoke the componentWillUpdate lifecycle when props changes', () => {
    const {
      presentationWrapper,
      props: { authors: { pageSize, pageCount, currentPage } }
    } = setup();

    const componentWillUpdateSpy = jest.spyOn(
      presentationWrapper.instance(), 'componentWillUpdate'
    );

    presentationWrapper.instance()
      .componentWillUpdate({ authors: { pageSize, pageCount, currentPage } });

    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });

  it('should invoke the handleOnAuthorDelete action when deleting an author', () => {
    const {
      presentationWrapper
    } = setup();

    const componentWillUpdateSpy = jest.spyOn(
      presentationWrapper.instance(), 'handleOnAuthorDelete'
    );

    presentationWrapper.instance()
      .handleOnAuthorDelete(authorsMock.authors[1].id);

    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });
});
