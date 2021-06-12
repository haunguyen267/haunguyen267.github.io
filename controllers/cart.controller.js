import { SESSIONARR } from '../db_product.js';

export const addToCart = (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;
  let productId = req.params.productId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  // let session = SESSIONARR.find((item) => item.id == sessionId);
  // let existProduct = session.cart.find((item) => item.productId == productId);

  // if (existProduct) {
  //   existProduct.productId = existProduct.productId + 1;
  // } else {
  //   session.cart.push({
  //     productId: 1
  //   });
  // }

  res.redirect('/products');
};
