const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  if (await Product.isNameTaken(productBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');
  }
  const product = await Product.create(productBody);
  return product;
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const updateProductById = async (id, updateBody) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (updateBody.name && (await Product.isNameTaken(updateBody.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  await Product.findByIdAndRemove(id);
  return product;
};

const importProducts = async (productBody) => {
  const nameList = productBody.products.map((item) => item.name);
  const listDupName = await Product.find({ name: { $in: nameList } }).select('name');
  // eslint-disable-next-line no-console
  console.log(listDupName);
  if (listDupName.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Product name: ${listDupName} already taken`);
  }

  const products = await Product.insertMany(productBody.products);
  return products;
};

module.exports = {
  queryProducts,
  getProductById,
  createProduct,
  importProducts,
  updateProductById,
  deleteProduct,
};
