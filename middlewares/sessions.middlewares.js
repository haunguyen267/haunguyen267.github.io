import { SESSIONARR } from '../db_product.js';

export const createSession = (req, res, next) => {
  if(!req.signedCookies.sessionId) {
    let sessionId = Math.floor(Math.random() * 1000);
    SESSIONARR.push({
      sessionId,
      cart: []
    });

    res.cookie('sessionId', sessionId, {
      signed: true
    });
  }

  next();
};
