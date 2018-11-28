/* eslint-disable */
import TablePagination from '../../../components/common/TablePagination';

const setup = (pageCount) => {
  const props = {
    pageCount,
    currentPage: 1,
    handlePageChange: jest.fn()
  };

  return mount(<TablePagination {...props} />);
};

let mountWrapper;

describe('<TablePagination /> component test', () => {
  it('renders component without crashing', () => {
    mountWrapper = setup(1);
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('renders appropriate elements', () => {
    mountWrapper = setup(1);
    expect(mountWrapper.find('.pagination-container').length).toEqual(1);
  });
});
