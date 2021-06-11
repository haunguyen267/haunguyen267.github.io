import PRODUCTARR from '../db_product.js';
import { truncateParagraph, pagination } from '../utils.js';

export const index = (req, res) => {
  let paginate = pagination(
    req.query.page, process.env.PRODUCT_PER_PAGE, PRODUCTARR.length);

  res.render('products/index', {
    productArr: PRODUCTARR.slice(paginate.begin, paginate.end),
    currentPage: paginate.currentPage,
    nextPage: paginate.nextPage,
    previousPage: paginate.previousPage,
    totalPage: paginate.totalPage,
    truncateParagraph: truncateParagraph
  });
};
