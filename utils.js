export const truncateParagraph = (text, maxlength) => {
  if (text.length <= parseInt(maxlength)) {
    return text;
  }

  return text.substring(0, parseInt(maxlength)) + '...';
};

export const pagination = (page, perPage, totalRecord) => {
  let currentPage = parseInt(page) || 1;
  perPage = parseInt(perPage);
  let begin = (currentPage-1) * perPage;
  let end = currentPage * perPage;
  let totalPage = totalRecord % perPage == 0 ? totalRecord / perPage :
    Math.trunc(totalRecord / perPage) + 1;

  let nextPage = (currentPage + 1) <= totalPage ? currentPage + 1 : -1;
  let previousPage = currentPage - 1 > 0 ? currentPage - 1 : -1;

  return {
    totalPage,
    currentPage,
    perPage,
    nextPage,
    previousPage,
    begin,
    end
  };
}
