const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const createProduct = catchAsync(async (req, res) => {
  const imageUrl = req.file.path.split('/').slice(1).join('/');
  const product = await productService.createProduct({ ...req.body, image: imageUrl });
  res.status(httpStatus.CREATED).send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProduct(req.params.productId);
  res.send(product);
});

const importProducts = catchAsync(async (req, res) => {
  const products = await productService.importProducts(req.body);
  res.status(httpStatus.CREATED).send(products);
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  importProducts,
  updateProduct,
  deleteProduct,
};
