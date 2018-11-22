const pagination = (items, currentPage) => {
  const PAGE_LIMIT = 3;
  const offset = Math.ceil((currentPage - 1) * PAGE_LIMIT);
  const totalItemCount = items.length;
  const itemsArray = Object.assign([], items);
  const paginatedItems = itemsArray.splice(offset, PAGE_LIMIT);

  const paginatedData = {
    currentPage,
    pageItemsSize: paginatedItems.length,
    totalPageCount: Math.ceil(totalItemCount / PAGE_LIMIT),
    paginatedItems
  };

  return paginatedData;
};

export default pagination;
