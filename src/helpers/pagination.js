const pagination = (items, currentPage) => {
  const PAGE_LIMIT = 2;
  const offset = Math.ceil((currentPage - 1) * PAGE_LIMIT);
  const totalItemCount = items.length;
  const courses = Object.assign([], items);
  const paginatedCourses = courses.splice(offset, PAGE_LIMIT);

  const paginatedData = {
    currentPage,
    pageItemsSize: paginatedCourses.length,
    totalPageCount: Math.ceil(totalItemCount / PAGE_LIMIT),
    paginatedCourses
  };

  return paginatedData;
};

export default pagination;
