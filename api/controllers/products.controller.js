import Product from '../../models/product.model.js';
import { pagination } from '../../utils.js';

export const index = async (req, res) => {
  const PRODUCTARR = await Product.find();

  let paginate = pagination(
    req.query.page, process.env.PRODUCT_PER_PAGE, PRODUCTARR.length);

  res.json({paginate, data: PRODUCTARR});
};

export const create = async (req, res) => {
  const product = await Product.create(req.body);

  res.json(product);
};
